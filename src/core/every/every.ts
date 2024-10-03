import { IterableInfer, ReturnIterableAsyncIterableType } from '../../types';
import { isAsyncIterable, isIterable } from '../../utils';
import toValue from '../to-value/to-value';

function* syncEvery<A, B>(fn: (args: A) => B, iter: Iterable<A>): IterableIterator<boolean> {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { value, done } = iterator.next();

    if (done) break;

    if (!fn(value)) yield false;
  }

  yield true;
}

async function* asyncEvery<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<boolean> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { value, done } = await iterator.next();

    if (done) break;

    if (!fn(value)) yield false;
  }

  yield true;
}

/**
 * @description
 * - 모든 요소가 특정 조건을 만족하는지 확인하는 함수입니다.
 * - 조건을 만족하면 true를, 하나라도 만족하지 않으면 false를 반환합니다.
 * - 동기 및 비동기 iterable 모두 지원합니다.
 *
 * @example
 * - 배열에서 사용
 * ```
 * const arr = [1, 2, 3];
 *
 * const result = every(x => x > 0, arr); // 출력: true
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const arr = [1, 2, 3];
 *
 * const result = pipe(
 *  arr,
 *  map(x => x * 2),
 *  every(x => x > 0),
 * ); // 출력: true
 *
 * const result2 = await pipe(
 *  arr,
 *  toAsync,
 *  map(x => x * 2),
 *  every(x => x > 0),
 * ); // 출력: true
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/every
 */

function every<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter: A,
): ReturnIterableAsyncIterableType<A, boolean>;

function every<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
): (iter: A) => ReturnIterableAsyncIterableType<A, boolean>;

function every<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
): ReturnIterableAsyncIterableType<A, boolean> | ((iter: A) => ReturnIterableAsyncIterableType<A, boolean>) {
  if (iter === undefined)
    return (iter: A): ReturnIterableAsyncIterableType<A, boolean> =>
      every(fn, iter) as ReturnIterableAsyncIterableType<A, boolean>;

  if (isIterable<IterableInfer<A>>(iter))
    return toValue(syncEvery(fn, iter)) as ReturnIterableAsyncIterableType<A, boolean>;

  if (isAsyncIterable<IterableInfer<A>>(iter))
    return toValue(asyncEvery(fn, iter)) as ReturnIterableAsyncIterableType<A, boolean>;

  throw new Error('argument is not iterable, every');
}

export default every;
