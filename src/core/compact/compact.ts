import { IterableInfer, PickPositiveType, ReturnIterableIteratorType } from '../../types';
import filter from '../filter/filter';

/**
 * @description
 * - 주어진 동기 및 비동기 iterable에서 falsy 값을 제거하여 반환합니다.
 * - 동기 및 비동기 iterable 모두를 지원합니다.
 *
 * @example
 * - 배열에서 falsy 값 제거
 * ```
 * const arr = [1, 2, 3, 0, null, undefined, false, 5];
 *
 * const result = compact(arr);
 *
 * console.log([...result]); // 출력: [1, 2, 3, 5]
 * ```
 *
 * @example
 * - 파이프라인과 함께 사용하기
 * ```
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 *
 * const res = pipe(
 *  range(1, 10),
 *  map(n => (n % 2 === 0 ? 0 : n)),
 *  compact,
 *  toArray,
 * ); // 출력: [1, 3, 5, 7, 9]
 *
 * const res = pipe(
 *  range(1, 10),
 *  toAsync,
 *  map(n => (n % 2 === 0 ? 0 : n)),
 *  compact,
 *  toArray,
 * ); // 출력: [1, 3, 5, 7, 9]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/compact
 */
function compact<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): ReturnIterableIteratorType<A, PickPositiveType<IterableInfer<A>>> {
  return filter(Boolean, iter) as ReturnIterableIteratorType<A, PickPositiveType<IterableInfer<A>>>;
}

export default compact;
