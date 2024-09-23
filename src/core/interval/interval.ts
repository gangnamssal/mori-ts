import { IterableInfer } from '../../types';
import { isAsyncIterable, isIterable } from '../../utils';

async function* syncInterval<A>(time: number, iter: Iterable<A>): AsyncIterableIterator<A> {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { value, done } = iterator.next();

    if (done) break;

    await new Promise(resolve => setTimeout(resolve, time));

    yield value;
  }
}

async function* asyncInterval<A>(time: number, iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { value, done } = await iterator.next();

    if (done) break;

    await new Promise(resolve => setTimeout(resolve, time));

    yield value;
  }
}

/**
 * @description
 * - 주어진 지연 시간 동안 각 요소를 대기하면서 제공된 iterable을 반환하는 함수입니다.
 * - 이 함수는 동기 및 비동기 iterable 모두를 지원하며, 비동기 작업에서 각 요소의 처리를 일정 시간 간격으로 지연시킬 수 있습니다.
 *
 * @example
 * - 동기 iterable에서 사용
 * ```
 * const iter = interval(100, [1, 2, 3]);
 *
 * console.log(await iter.next()); // 출력: { value: 1, done: false }, 출력시간: 약 100ms
 * console.log(await iter.next()); // 출력: { value: 2, done: false }, 출력시간: 약 100ms
 * console.log(await iter.next()); // 출력: { value: 3, done: false }, 출력시간: 약 100ms
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const start = Date.now();
 *
 * const res = await pipe(
 *  [1, 2, 3],
 *  interval(100),
 *  map(x => x + 1),
 *  toArray,
 * );
 *
 * const end = Date.now();
 *
 * console.log(res); // 출력: [2, 3, 4]
 * console.log(`Elapsed time: ${end - start}ms`); // 출력: 약 300ms
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/interval
 */

function interval<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  time: number,
  iter: A,
): AsyncIterableIterator<IterableInfer<A>>;

function interval<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  time: number,
): (iter: A) => AsyncIterableIterator<IterableInfer<A>>;

function interval<A extends Iterable<unknown> | AsyncIterable<unknown>>(time: number, iter?: A) {
  if (!iter) return (iter: A) => interval(time, iter);

  if (isIterable<IterableInfer<A>>(iter)) return syncInterval(time, iter);

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncInterval(time, iter);

  throw new Error('argument must be an iterable or async iterable');
}

export default interval;
