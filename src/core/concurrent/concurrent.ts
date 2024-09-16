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

/**
 * @description
 * - 비동기 작업을 병렬로 처리할 수 있도록 도와줍니다.
 * - 이 함수는 비동기 iterable을 처리할 때 동시에 실행할 최대 작업 수를 제한하여 병목 현상을 줄이고 성능을 향상시킵니다.
 *
 * @example
 * - map과 함께 사용하기
 * ```
 * const start = Date.now();
 *
 * const result = await pipe(
 *   range(0, 6),               // 0부터 6까지의 범위를 생성합니다.
 *   toAsync,                   // 이를 비동기 iterable로 변환합니다.
 *   map(x => delay(1000, x)),  // 각 요소에 대해 1초 지연을 적용합니다.
 *   concurrent(4),             // 동시에 최대 4개의 작업을 병렬로 처리합니다.
 *   toArray                    // 최종 결과를 배열로 변환합니다.
 * );
 *
 * const end = Date.now();
 *
 * console.log(result);         // 출력: [0, 1, 2, 3, 4, 5]
 * console.log(end - start);    // 실행 시간은 대략 2000ms 입니다.
 * ```
 *
 * @example
 * - filter와 함께 사용하기
 * ```
 * const start = Date.now();
 *
 * const result = await pipe(
 *   range(0, 6),            // 0부터 6까지의 범위를 생성합니다.
 *   toAsync,                // 이를 비동기 iterable로 변환합니다.
 *   filter(x => delay(1000, x % 2 === 0)), // 각 요소에 대해 1초 지연 후 짝수인지 확인합니다.
 *   concurrent(4),          // 동시에 최대 4개의 작업을 병렬로 처리합니다.
 *   toArray                 // 최종 결과를 배열로 변환합니다.
 * );
 *
 * const end = Date.now();
 *
 * console.log(result);      // 출력: [0, 2, 4]
 * console.log(end - start); // 실행 시간은 대략 2000ms 입니다.
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/concurrent
 */

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

        if (value.done) finished = true;
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
