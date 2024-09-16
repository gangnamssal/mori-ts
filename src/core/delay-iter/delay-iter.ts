import { IterableInfer } from '../../types';
import { isAsyncIterable, isIterable } from '../../utils';

async function* syncDelayIter<A>(time: number, iter: Iterable<A>): AsyncIterableIterator<A> {
  await new Promise(resolve => setTimeout(resolve, time));

  yield* iter;
}

async function* asyncDelayIter<A>(time: number, iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  await new Promise(resolve => setTimeout(resolve, time));

  yield* iter;
}

/**
 * @description
 * - 주어진 지연 시간(ms) 동안 각 요소의 반환을 대기하며 iterable을 생성하는 함수입니다.
 * - 이 함수는 동기와 비동기 iterable 모두를 지원합니다. 이를 통해 각 요소가 일정한 시간 간격으로 처리되도록 제어할 수 있습니다.
 *
 * @example
 * - 동기 iterable에서 사용
 * ```
 * const iter = await delayIter(100, [1, 2, 3]);
 *
 * console.log(await iter.next()); // 출력: { value: 1, done: false }
 * console.log(await iter.next()); // 출력: { value: 2, done: false }
 * console.log(await iter.next()); // 출력: { value: 3, done: false }
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const start = Date.now();
 *
 * const res = await pipe(
 *  [1, 2, 3],
 *  map(x => x + 1),
 *  delayIter(100),
 *  toArray,
 * );
 *
 * const end = Date.now();
 *
 * console.log(res); // 출력: [2, 3, 4]
 * console.log(`Elapsed time: ${end - start}ms`); // 출력: 약 100ms
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/delayIter
 */

function delayIter<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  time: number,
  iter: A,
): AsyncIterableIterator<IterableInfer<A>>;

function delayIter<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  time: number,
): (iter: A) => AsyncIterableIterator<IterableInfer<A>>;

function delayIter<A extends Iterable<unknown> | AsyncIterable<unknown>>(time: number, iter?: A) {
  if (!iter) return (iter: A) => delayIter(time, iter);

  if (isIterable<IterableInfer<A>>(iter)) return syncDelayIter(time, iter);

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncDelayIter(time, iter);

  throw new Error('argument must be an iterable or async iterable');
}

export default delayIter;
