import { IterableInfer, RejectType, ResolveType } from './../../types';

export class Concurrent {
  limit: number;

  constructor(limit: number) {
    this.limit = limit;
  }

  static of(limit: number) {
    return new Concurrent(limit);
  }
}

export const isConcurrent = (concurrent: unknown): concurrent is Concurrent => {
  return concurrent instanceof Concurrent;
};

function concurrent<A extends AsyncIterable<unknown>>(
  limit: number,
): (iter: A) => AsyncIterableIterator<IterableInfer<A>>;

function concurrent<A extends AsyncIterable<unknown>>(
  limit: number,
  iter: A,
): AsyncIterableIterator<IterableInfer<A>>;

function concurrent<A extends AsyncIterable<unknown>>(
  limit: number,
  iter?: A,
): AsyncIterableIterator<IterableInfer<A>> | ((iter: A) => AsyncIterableIterator<IterableInfer<A>>) {
  if (!iter)
    return (iter: A): AsyncIterableIterator<IterableInfer<A>> =>
      concurrent(limit, iter) as AsyncIterableIterator<IterableInfer<A>>;

  if (limit === Infinity || limit <= 0 || limit === -Infinity)
    throw new Error('limit must be a positive number');

  // 이터레이터
  const iterator = iter[Symbol.asyncIterator]();

  // 버퍼큐
  const bufferQueue: PromiseSettledResult<IteratorResult<IterableInfer<A>, any>>[] = [];

  // 작업이 완료된 큐
  const settledQueue: [ResolveType<IterableInfer<A>>, RejectType][] = [];

  // 이전 작업
  let prevTask = Promise.resolve();

  // 버퍼큐에 작업이 추가된 횟수
  let callCount = 0;

  // 작업이 완료된 큐의 길이
  let resolvedCount = 0;

  // 작업이 완료되었는지 여부
  let finished = false;

  // 작업이 진행중인지 여부
  let pending = false;

  // 버퍼큐에 있는 작업을 실행
  const taskQueue = () => {
    while (bufferQueue.length > 0 && callCount > resolvedCount) {
      const [resolve, reject] = settledQueue.shift() as [ResolveType<IterableInfer<A>>, RejectType];
      const { status, value, reason } = bufferQueue.shift() as any;

      if (status === 'fulfilled') {
        resolvedCount++;
        resolve(value);

        if(value.done) finished = true;
        
      } else {
        reject(reason);
        finished = true;
        break;
      }
    }
  };

  // 버퍼큐에 작업을 추가
  const addBuffer = () => {
    if (pending) {
      prevTask = prevTask.then(() => void (!finished && callCount > resolvedCount && addBuffer()));
    } else {
      const nextItems = Promise.allSettled(
        Array.from({ length: limit }, () => iterator.next(Concurrent.of(limit) as any)),
      ) as Promise<PromiseSettledResult<IteratorResult<IterableInfer<A>, any>>[]>;

      pending = true;
      prevTask = prevTask
        .then(() => nextItems)
        .then(nextItems => {
          bufferQueue.push(...nextItems);
          pending = false;
          recur();
        });
    }
  };

  // 재귀적으로 작업을 실행
  const recur = async () => {
    if (finished || callCount === resolvedCount) return;

    if (bufferQueue.length > 0) return taskQueue();

    return addBuffer();
  };

  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    next() {
      callCount++;

      if (finished) return { done: true, value: undefined };

      return new Promise((resolve, reject) => {
        settledQueue.push([resolve, reject]);
        recur();
      });
    },
  } as AsyncIterableIterator<IterableInfer<A>>;
}

export default concurrent;
