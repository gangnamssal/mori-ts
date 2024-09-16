import { isPromiseLike } from '../../utils';

/**
 * @description
 * - iterable을 비동기 iterable로 변환합니다.
 * - 다른 함수와 조합하여 사용할 수 있습니다
 *
 * @example
 * - 기본 사용법
 * ```
 * const iter = toAsync([1, 2, 3]);
 *
 * console.log(await iter.next()); // { done: false, value: 1 }
 * console.log(await iter.next()); // { done: false, value: 2 }
 * console.log(await iter.next()); // { done: false, value: 3 }
 * console.log(await iter.next()); // { done: true, value: undefined }
 * ```
 *
 * @example
 * - 프로미스를 포함한 배열 처리
 * ```
 * const iter = toAsync([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
 *
 * console.log(await iter.next()); // { done: false, value: 1 }
 * console.log(await iter.next()); // { done: false, value: 2 }
 * console.log(await iter.next()); // { done: false, value: 3 }
 * console.log(await iter.next()); // { done: true, value: undefined }
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/toAsync
 */

function toAsync<A>(iter: Iterable<A | Promise<A>>): AsyncIterableIterator<A> {
  const iterator = iter[Symbol.iterator]();

  return {
    async next() {
      const { value, done } = iterator.next();

      if (isPromiseLike(value)) return value.then(value => ({ done, value }));

      return { done, value };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

export default toAsync;
