import map from '../map/map';
import flat from '../flat/flat';
import pipe from '../pipe/pipe';
import { IterableInfer, ReturnIterableIteratorType, IterableRecurInfer } from '../../types';

/**
 * @description
 * - iterable의 각 요소에 대해 제공된 함수를 적용하고, 결과로 얻어진 배열을 평평하게(flatten) 만들어 반환합니다.
 * - 각 요소를 변환하여 여러 값을 생성한 뒤, 이 값을 단일 레벨로 펼쳐줍니다.
 * - 동기 및 비동기 iterable 모두 지원합니다.
 *
 * @example
 * - iterable에서 사용
 * ```
 * const array = [1, 2, 3];
 *
 * const iter = flatMap(a => [a, a * 2], array);
 *
 * console.log([...iter]); // 출력: [1, 2, 2, 4, 3, 6]
 * console.log(toArray(iter)); // 출력: [1, 2, 2, 4, 3, 6]
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const iter = [1, 2, 3];
 *
 * const res = pipe(
 *  iter,
 *  flatMap(a => [[[a]], [[[[[[a * 2]]]]]]]),
 *  toArray,
 * ); // 출력: [1, 2, 2, 4, 3, 6]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/flatMap
 */

function flatMap<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(fn: (args: IterableInfer<A>) => B, iter: A): ReturnIterableIteratorType<A, IterableRecurInfer<B>>;

function flatMap<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(fn: (args: IterableInfer<A>) => B): (iter: A) => ReturnIterableIteratorType<A, IterableRecurInfer<B>>;

function flatMap<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
):
  | ReturnIterableIteratorType<A, IterableRecurInfer<B>>
  | ((iter: A) => ReturnIterableIteratorType<A, IterableRecurInfer<B>>) {
  if (iter === undefined)
    return (iter: A): ReturnIterableIteratorType<A, IterableRecurInfer<B>> =>
      flatMap(fn, iter as any) as ReturnIterableIteratorType<A, IterableRecurInfer<B>>;

  return pipe(iter, map(fn), flat) as any as ReturnIterableIteratorType<A, IterableRecurInfer<B>>;
}

export default flatMap;
