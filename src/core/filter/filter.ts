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
  const settledQueue: [ResolveType<A>, RejectType][] = [] as [ResolveType<A>, RejectType][];

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

  const recur = (concurrent: Concurrent) => {
    if (finished || callCount === resolvedCount) return;
    else if (bufferQueue.length > 0) taskQueue();
    else addBuffer(concurrent);
  };

  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    async next(concurrent: any) {
      callCount++;

      if (finished) return { done: true, value: undefined };

      return new Promise((resolve, reject) => {
        settledQueue.push([resolve, reject]);
        recur(concurrent);
      });
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

/**
 * @description
 * - 주어진 조건을 만족하는 요소만 포함된 iterable을 반환합니다.
 * - 조건을 만족하지 않는 요소는 제외됩니다.
 * - 동기 및 비동기 iterable 모두 지원합니다.
 *
 * @example
 * - 배열에서 사용
 * ```
 * const items = [
 *  { name: 'item 1', value: 1 },
 *  { name: 'item 2', value: 2 },
 *  { name: 'item 3', value: 3 },
 * ];
 *
 * const result = filter(item => item.value === 1, items);
 *
 * console.log([...result]); // 출력: [{ name: 'item 1', value: 1 }]
 * console.log(toArray(result)); // 출력: [{ name: 'item 1', value: 1 }]
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const iter = [1, 2, 3];
 *
 * const res = await pipe(
 *  iter,
 *  toAsync,
 *  filter(item => item === 1),
 *  toArray,
 * ); // 출력: [1]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/filter
 */

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
  if (iter === undefined)
    return (iter: A): ReturnIterableIteratorType<A> =>
      filter(fn, iter as any) as ReturnIterableIteratorType<A>;

  if (isIterable<IterableInfer<A>>(iter)) return syncFilter(fn, iter) as ReturnIterableIteratorType<A>;

  if (isAsyncIterable<IterableInfer<A>>(iter)) return async(fn, iter) as ReturnIterableIteratorType<A>;

  throw new Error('Must be an iterable or async iterable');
}

export default filter;
