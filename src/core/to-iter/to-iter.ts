import { ReturnConvertedIterableType } from '../../types';
import { isAsyncIterable, isIterable, isPromiseLike } from './../../utils';

function syncToIter<A>(value: A): IterableIterator<A> {
  let isDone = false;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      if (isDone || value === undefined) return { value: undefined, done: true };

      isDone = true;

      return { value, done: false };
    },
  };
}

function asyncToIter<A extends Promise<unknown>>(value: A): AsyncIterableIterator<Awaited<A>> {
  let isDone = false;

  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    async next() {
      const VALUE = await value;

      if (isDone || VALUE === undefined) return { value: undefined, done: true };

      return { value: VALUE, done: false };
    },
  };
}

/**
 * @description
 * - 동기 값일 경우, sync iterable로 변환합니다.
 * - 비동기 값일 경우, async iterable로 변환합니다.
 * - 변환된 iterable은 한 번만 값을 반환하며, 이후에는 종료됩니다.
 *
 * @example
 * - 동기 값일 경우
 * ```
 * const value = 1;
 * const iter = toIter(value);
 *
 * console.log(iter.next()); // 출력: { value: 1, done: false }
 * console.log(iter.next()); // 출력: { value: undefined, done: true }
 * ```
 *
 * @example
 * - 비동기 값일 경우
 * ```
 * const asyncValue = Promise.resolve(10);
 * const asyncIter = toIter(asyncValue);
 *
 * console.log(await asyncIter.next()); // 출력: { value: 10, done: false }
 * console.log(await asyncIter.next()); // 출력: { value: undefined, done: true }
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * import { pipe, map, find, toIter, compact, toValue, range } from 'mori-ts';
 *
 * const res = pipe(
 *   range(1, 10),
 *   map(x => x * 2),
 *   find(x => x === 16),
 *   toIter,
 *   compact,
 *   map(x => x + 1),
 *   toValue
 * ); // 출력: 17
 *
 *```
 * @url https://github.com/gangnamssal/mori-ts/wiki/toIter
 */

function toIter<A>(value: A): ReturnConvertedIterableType<A> {
  if (isIterable(value)) return value[Symbol.iterator]() as ReturnConvertedIterableType<A>;

  if (isAsyncIterable(value)) return value[Symbol.asyncIterator]() as ReturnConvertedIterableType<A>;

  if (isPromiseLike(value)) return asyncToIter(value) as ReturnConvertedIterableType<A>;

  return syncToIter(value) as ReturnConvertedIterableType<A>;
}

export default toIter;
