import { isAsyncIterable, isIterable, isPromise } from '../../utils';
import concurrent, { Concurrent, isConcurrent } from './../concurrent/concurrent';
import { IterableInfer, RejectType, ResolveType, ReturnIterableIteratorType } from '../../types';

function* syncFilter<A, B>(fn: (args: A) => B, iter: Iterable<A>): IterableIterator<A> {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { done, value } = iterator.next();

    if (done) break;

    if (fn(value)) yield value;
  }
}

function concurrentFilter<A>(iterable: AsyncIterable<[boolean, A]>): AsyncIterableIterator<A> {
  // 이터레이터
  const iterator = iterable[Symbol.asyncIterator]();

  //작업이 완료된 큐
  const settledQueue: [ResolveType<A>, RejectType][] = [] as unknown as [ResolveType<A>, RejectType][];

  // 버퍼큐
  const bufferQueue: A[] = [];

  // 작업 완료 여부
  let finished = false;

  // 버퍼큐에 작업이 추가된 횟수
  let callCount = 0;

  // 작업이 완료된 큐의 길이
  let resolvedCount = 0;

  // 이전 작업
  let prevItem = Promise.resolve();

  function addBuffer(concurrent: Concurrent) {
    const nextItem = iterator.next(concurrent as any);
    prevItem = prevItem
      .then(() => nextItem)
      .then(({ done, value }) => {
        if (done) {
          while (settledQueue.length > 0) {
            const [resolve] = settledQueue.shift()!;
            resolve({ done: true, value: undefined });
          }

          return void (finished = true);
        }

        const [isFiltered, item] = value;

        if (isFiltered) bufferQueue.push(item);

        recur(concurrent);
      })

      .catch(reason => {
        finished = true;
        while (settledQueue.length > 0) {
          const [, reject] = settledQueue.shift()!;
          reject(reason);
        }
      });
  }

  function taskQueue() {
    while (bufferQueue.length > 0 && callCount > resolvedCount) {
      const value = bufferQueue.shift()!;
      const [resolve] = settledQueue.shift()!;
      resolve({ done: false, value });
      resolvedCount++;
    }
  }

  function recur(concurrent: Concurrent) {
    if (finished || callCount === resolvedCount) {
      return;
    } else if (bufferQueue.length > 0) {
      taskQueue();
    } else {
      addBuffer(concurrent);
    }
  }

  return {
    async next(concurrent: any) {
      callCount++;
      if (finished) {
        return { done: true, value: undefined };
      }
      return new Promise((resolve, reject) => {
        settledQueue.push([resolve, reject]);
        recur(concurrent as Concurrent);
      });
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

async function* asyncFilter<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { done, value } = await iterator.next();
    if (done) return;

    const result = await fn(value);

    if (result) yield value;
  }
}

function toAsyncIterableFilter<A, B>(
  fn: (args: A) => B,
  iter: AsyncIterable<A>,
): AsyncIterableIterator<[boolean, A]> {
  const iterator = iter[Symbol.asyncIterator]();

  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    async next(_concurrent) {
      const { done, value } = await iterator.next(_concurrent);

      if (done) return { done: true, value: undefined } as IteratorReturnResult<undefined>;

      return isPromise(
        fn(value),
        cond =>
          ({
            done,
            value: [Boolean(cond), value],
          }) as IteratorYieldResult<[boolean, A]>,
      );
    },
  };
}

function async<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  let _iterator: AsyncIterator<A>;

  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    async next(_concurrent: any) {
      if (!_iterator) {
        _iterator = isConcurrent(_concurrent)
          ? concurrentFilter(concurrent(_concurrent.limit, toAsyncIterableFilter(fn, iter)))
          : asyncFilter(fn, iter);
      }

      return _iterator.next(_concurrent);
    },
  };
}

function filter<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter: A,
): ReturnIterableIteratorType<A>;

function filter<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
): (iter: A) => ReturnIterableIteratorType<A>;

function filter<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
): ReturnIterableIteratorType<A> | ((iter: A) => ReturnIterableIteratorType<A>) {
  if (!iter)
    return (iter: A): ReturnIterableIteratorType<A> =>
      filter(fn, iter as any) as ReturnIterableIteratorType<A>;

  if (isIterable<IterableInfer<A>>(iter)) return syncFilter(fn, iter) as ReturnIterableIteratorType<A>;

  if (isAsyncIterable<IterableInfer<A>>(iter)) return async(fn, iter) as ReturnIterableIteratorType<A>;

  throw new Error('Must be an iterable or async iterable');
}

export default filter;
