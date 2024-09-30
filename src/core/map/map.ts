import { isAsyncIterable, isIterable } from './../../utils';

import { IterableInfer, ReturnIterableIteratorType } from './../../types';

function* syncMap<A, B>(fn: (args: A) => B, iter: Iterable<A>): IterableIterator<B> {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { done, value } = iterator.next();

    if (done) break;

    yield fn(value);
  }
}

function asyncMap<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<B> {
  const iterator = iter[Symbol.asyncIterator]();

  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    async next() {
      const { done, value } = await iterator.next();

      if (done) return { done: true, value: undefined };

      return { done: false, value: await fn(value) };
    },
  };
}

/**
 * @description
 * - 주어진 함수를 iterable의 각 요소에 적용하여 새로운 이터러블을 생성합니다.
 * - 동기 및 비동기 iterable 모두 지원합니다.
 *
 * @example
 * - iterable에서 사용
 * ```
 * const array = [1, 2, 3];
 *
 * const result = map(value => value * 2, array);
 *
 * console.log([...result]); // 출력: [2, 4, 6]
 * console.log(toArray(result)); // 출력: [2, 4, 6]
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const res = pipe(
 *  [1, 2, 3],
 *  toAsync,
 *  map(value => value * 2),
 *  toArray,
 * ); // 출력: [2, 4, 6]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/map
 */

function map<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter: A,
): ReturnIterableIteratorType<A, B>;

function map<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
): (iter: A) => ReturnIterableIteratorType<A, B>;

function map<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
):
  | IterableIterator<B>
  | AsyncIterableIterator<B>
  | ((iter: A) => IterableIterator<B> | AsyncIterableIterator<B>) {
  if (iter === undefined)
    return (iter: A): ReturnIterableIteratorType<A, B> =>
      map(fn, iter as any) as ReturnIterableIteratorType<A, B>;

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncMap(fn, iter);

  if (isIterable<IterableInfer<A>>(iter)) return syncMap(fn, iter);

  throw new Error('iterable or asyncIterable is required as second argument');
}

export default map;
