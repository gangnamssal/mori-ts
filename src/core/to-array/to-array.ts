import { ReturnArrayType } from '../../types';
import { isAsyncIterable, isIterable } from '../../utils';

async function asyncToArray<A>(iter: AsyncIterable<A>): Promise<A[]> {
  const res: A[] = [];

  for await (const a of iter) {
    res.push(a);
  }

  return res;
}

/**
 * @description
 * - iterable을 배열로 변환하는 유틸리티 함수입니다.
 * - 다른 함수와 조합하여 사용할 수 있습니다
 *
 * @example
 * - iterable을 배열로 변환
 * ```
 * function* iterable() {
 *  yield 1;
 *  yield 2;
 *  yield 3;
 * };
 *
 * const result = toArray(iterable()); // 출력: [1, 2, 3]
 * ```
 *
 * @example
 * - asyncIterable을 배열로 변환
 * ```
 * async function* asyncIterable() {
 *  yield 1;
 *  yield 2;
 *  yield 3;
 * };
 *
 * const result = await toArray(asyncIterable()); // 출력: [1, 2, 3]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/toArray
 */

function toArray<A extends Iterable<any> | AsyncIterable<any>>(iter: A): ReturnArrayType<A>;

function toArray<A extends Iterable<A> | AsyncIterable<A>>(iter: A) {
  if (isIterable(iter)) return Array.from(iter);

  if (isAsyncIterable(iter)) return asyncToArray(iter);

  return [];
}

export default toArray;
