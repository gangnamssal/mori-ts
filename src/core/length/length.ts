import reduce from '../reduce/reduce';
import { ReturnIterableAsyncIterableType } from '../../types';

/**
 * @description
 * - length 함수는 iterable의 요소 개수를 반환합니다.
 * - 동기 및 비동기 iterable 모두 지원합니다.
 *
 * @example
 * - iterable에서 사용
 * ```
 * const str = "Hello, Mori!";
 *
 * const result = length(str); // 출력: 12
 *
 * const arr = [1, 2, 3, 4, 5];
 *
 * const result2 = length(arr); // 출력: 5
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const res = pipe(range(1, 10), length); // 출력: 9
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/length
 */

function length<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): ReturnIterableAsyncIterableType<A, number> {
  return reduce(acc => acc + 1, 0, iter);
}

export default length;
