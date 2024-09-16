import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableType } from '../../types';

function syncFind<A, R>(fn: (args: A) => R, iter: Iterable<A>): A | undefined {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { value, done } = iterator.next();

    if (done) return;

    if (fn(value)) return value;
  }
}

async function asyncFind<A, R>(fn: (args: A) => R, iter: AsyncIterable<A>): Promise<A | undefined> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { value, done } = await iterator.next();

    if (done) return;

    if (fn(value)) return value;
  }
}

/**
 * @description
 * - 주어진 조건을 만족하는 첫 번째 요소를 찾습니다.
 * - 조건을 만족하는 요소가 발견되면 해당 요소를 반환하고, 조건을 만족하는 요소가 없으면 undefined를 반환합니다.
 * - 동기 및 비동기 iterable 모두 지원합니다.
 *
 * @example
 * - iterable에서 사용
 * ```
 * const array = [1, 2, 3, 4, 5];
 *
 * const result = find(x => x > 2, array);
 *
 * console.log(result); // 출력: 3
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const iter = [1, 2, 3, 4, 5];
 *
 * const result = pipe(
 *  iter,
 *  map(x => x * 2),
 *  find(x => x > 5),
 * );
 *
 * console.log(result); // 출력: 6
 *
 * const result2 = await pipe(
 *  iter,
 *  toAsync,
 *  map(x => x * 2),
 *  find(x => x > 5),
 * );
 *
 * console.log(result); // 출력: 6
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/find
 */

function find<A extends Iterable<unknown> | AsyncIterable<unknown>, R>(
  fn: (args: IterableInfer<A>) => R,
  iter: A,
): ReturnIterableType<A, IterableInfer<A> | undefined>;

function find<A extends Iterable<unknown> | AsyncIterable<unknown>, R>(
  fn: (args: IterableInfer<A>) => R,
): (iter: A) => ReturnIterableType<A, IterableInfer<A> | undefined>;

function find<A extends Iterable<unknown> | AsyncIterable<unknown>, R>(
  fn: (args: IterableInfer<A>) => R,
  iter?: A,
):
  | ReturnIterableType<A, IterableInfer<A> | undefined>
  | ((iter: A) => ReturnIterableType<A, IterableInfer<A> | undefined>) {
  if (!iter)
    return (iter: A): ReturnIterableType<A, IterableInfer<A> | undefined> =>
      find(fn, iter) as ReturnIterableType<A, IterableInfer<A> | undefined>;

  if (isIterable<IterableInfer<A>>(iter))
    return syncFind(fn, iter) as ReturnIterableType<A, IterableInfer<A> | undefined>;

  if (isAsyncIterable<IterableInfer<A>>(iter))
    return asyncFind(fn, iter) as ReturnIterableType<A, IterableInfer<A> | undefined>;

  throw new Error('argument is not iterable');
}

export default find;
