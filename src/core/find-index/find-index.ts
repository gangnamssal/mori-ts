import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableType } from './../../types';
import toValue from '../to-value/to-value';

function* syncFindIndex<A, B>(fn: (arg: A) => B, iter: Iterable<A>): IterableIterator<number> {
  const iterator = iter[Symbol.iterator]();

  let currentIndex = 0;

  while (true) {
    const { value, done } = iterator.next();

    if (done) break;

    if (fn(value)) yield currentIndex;

    currentIndex++;
  }

  return -1;
}

async function* asyncFindIndex<A, B>(
  fn: (arg: A) => B,
  iter: AsyncIterable<A>,
): AsyncIterableIterator<number> {
  const iterator = iter[Symbol.asyncIterator]();

  let currentIndex = 0;

  while (true) {
    const { value, done } = await iterator.next();

    if (done) break;

    if (fn(value)) yield currentIndex;

    currentIndex++;
  }

  return -1;
}

type FindIndexReturnType<A extends Iterable<unknown> | AsyncIterable<unknown>> = ReturnIterableType<
  A,
  number
>;

/**
 * @description
 * - 주어진 조건을 만족하는 `첫 번째 요소의 인덱스`를 찾습니다.
 * - 조건을 만족하는 요소가 발견되면 해당 요소의 인덱스를 반환하고, 조건을 만족하는 요소가 없으면 `-1`을 반환합니다.
 * - 동기 및 비동기 iterable 모두에서 사용될 수 있습니다.
 *
 * @example
 * - 배열에서 사용
 * ```ts
 * const arr = [1, 2, 3, 4, 5];
 *
 * const result = findIndex(x => x > 3, arr); // 출력: 3
 * const noResult = findIndex(x => x > 6, arr); // 출력: -1
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```ts
 * const arr = [1, 2, 3, 4, 5];
 *
 * const result = pipe(
 *   arr,
 *   findIndex(x => x > 3),
 * ); // 출력: 3
 * ```
 *
 * @example
 * - 비동기 iterable에서 사용
 * ```ts
 * const asyncArr = [
 *   Promise.resolve(1),
 *   Promise.resolve(2),
 *   Promise.resolve(3),
 *   Promise.resolve(4),
 *   Promise.resolve(5),
 * ];
 *
 * const asyncResult = await pipe(
 *   asyncArr,
 *   toAsync,
 *   findIndex(x => x > 3),
 * ); // 출력: 3
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/findIndex
 */

function findIndex<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (arg: IterableInfer<A>) => B,
  iter: A,
): FindIndexReturnType<A>;

function findIndex<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (arg: IterableInfer<A>) => B,
): (iter: A) => FindIndexReturnType<A>;

function findIndex<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (arg: IterableInfer<A>) => B,
  iter?: A,
): FindIndexReturnType<A> | ((iter: A) => FindIndexReturnType<A>) {
  if (iter === undefined)
    return (iter: A): FindIndexReturnType<A> => findIndex(fn, iter) as FindIndexReturnType<A>;

  if (isIterable<IterableInfer<A>>(iter)) return toValue(syncFindIndex(fn, iter)) as FindIndexReturnType<A>;

  if (isAsyncIterable<IterableInfer<A>>(iter))
    return toValue(asyncFindIndex(fn, iter)) as FindIndexReturnType<A>;

  throw new Error('argument is not valid, findIndex only works with sync and async iterables');
}

export default findIndex;
