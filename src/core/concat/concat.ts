import { flat, pipe } from '..';
import { ReturnIterableIteratorType } from '../../types';

/**
 * @description
 * - 주어진 동기 iterable들을 연결하여 하나의 iterable로 반환합니다.
 * - 배열, 객체 배열, 빈 배열 등 다양한 타입의 iterable을 처리할 수 있습니다.
 *
 * @example
 * - 여러 배열을 연결하기
 * ```
 * const array1 = [1, 2, 3];
 * const array2 = [4, 5, 6];
 * const array3 = [7, 8, 9];
 *
 * const result = concat(array1, array2, array3);
 *
 * console.log([...result]); // 출력: [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * ```
 *
 * @example
 * - 다양한 타입의 iterable을 연결하기
 * ```
 * const array1 = [1, 2, 3];
 * const array2 = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * const array3 = [];
 *
 * const result = concat(array1, array2, array3);
 *
 * console.log([...result]); // 출력: [1, 2, 3, { a: 1 }, { a: 2 }, { a: 3 }]
 * ```
 *
 * @example
 * - 파이프라인과 함께 사용하기
 * ```
 * const iter1 = [1, 2, 3];
 * const iter2 = [4, 5, 6];
 *
 * const res = pipe(
 *  concat(iter1, iter2),
 *  map(x => x * 2),
 *  toArray,
 * );
 *
 * console.log(res); // 출력: [2, 4, 6, 8, 10, 12]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/concat
 */

function concat<A1 extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter1: A1,
): ReturnIterableIteratorType<A1>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
>(iter1: A1, iter2: A2): ReturnIterableIteratorType<A1 | A2>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
>(iter1: A1, iter2: A2, iter3: A3): ReturnIterableIteratorType<A1 | A2 | A3>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
>(iter1: A1, iter2: A2, iter3: A3, iter4: A4): ReturnIterableIteratorType<A1 | A2 | A3 | A4>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
>(iter1: A1, iter2: A2, iter3: A3, iter4: A4, iter5: A5): ReturnIterableIteratorType<A1 | A2 | A3 | A4 | A5>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
): ReturnIterableIteratorType<A1 | A2 | A3 | A4 | A5 | A6>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
): ReturnIterableIteratorType<A1 | A2 | A3 | A4 | A5 | A6 | A7>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
): ReturnIterableIteratorType<A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
  A9 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
  iter9: A9,
): ReturnIterableIteratorType<A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
  A9 extends Iterable<unknown> | AsyncIterable<unknown>,
  A10 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
  iter9: A9,
  iter10: A10,
): ReturnIterableIteratorType<A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
  A9 extends Iterable<unknown> | AsyncIterable<unknown>,
  A10 extends Iterable<unknown> | AsyncIterable<unknown>,
  A11 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
  iter9: A9,
  iter10: A10,
  iter11: A11,
): ReturnIterableIteratorType<A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10 | A11>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
  A9 extends Iterable<unknown> | AsyncIterable<unknown>,
  A10 extends Iterable<unknown> | AsyncIterable<unknown>,
  A11 extends Iterable<unknown> | AsyncIterable<unknown>,
  A12 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
  iter9: A9,
  iter10: A10,
  iter11: A11,
  iter12: A12,
): ReturnIterableIteratorType<A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10 | A11 | A12>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
  A9 extends Iterable<unknown> | AsyncIterable<unknown>,
  A10 extends Iterable<unknown> | AsyncIterable<unknown>,
  A11 extends Iterable<unknown> | AsyncIterable<unknown>,
  A12 extends Iterable<unknown> | AsyncIterable<unknown>,
  A13 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
  iter9: A9,
  iter10: A10,
  iter11: A11,
  iter12: A12,
  iter13: A13,
): ReturnIterableIteratorType<A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10 | A11 | A12 | A13>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
  A9 extends Iterable<unknown> | AsyncIterable<unknown>,
  A10 extends Iterable<unknown> | AsyncIterable<unknown>,
  A11 extends Iterable<unknown> | AsyncIterable<unknown>,
  A12 extends Iterable<unknown> | AsyncIterable<unknown>,
  A13 extends Iterable<unknown> | AsyncIterable<unknown>,
  A14 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
  iter9: A9,
  iter10: A10,
  iter11: A11,
  iter12: A12,
  iter13: A13,
  iter14: A14,
): ReturnIterableIteratorType<A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10 | A11 | A12 | A13 | A14>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
  A9 extends Iterable<unknown> | AsyncIterable<unknown>,
  A10 extends Iterable<unknown> | AsyncIterable<unknown>,
  A11 extends Iterable<unknown> | AsyncIterable<unknown>,
  A12 extends Iterable<unknown> | AsyncIterable<unknown>,
  A13 extends Iterable<unknown> | AsyncIterable<unknown>,
  A14 extends Iterable<unknown> | AsyncIterable<unknown>,
  A15 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
  iter9: A9,
  iter10: A10,
  iter11: A11,
  iter12: A12,
  iter13: A13,
  iter14: A14,
  iter15: A15,
): ReturnIterableIteratorType<A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10 | A11 | A12 | A13 | A14 | A15>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
  A9 extends Iterable<unknown> | AsyncIterable<unknown>,
  A10 extends Iterable<unknown> | AsyncIterable<unknown>,
  A11 extends Iterable<unknown> | AsyncIterable<unknown>,
  A12 extends Iterable<unknown> | AsyncIterable<unknown>,
  A13 extends Iterable<unknown> | AsyncIterable<unknown>,
  A14 extends Iterable<unknown> | AsyncIterable<unknown>,
  A15 extends Iterable<unknown> | AsyncIterable<unknown>,
  A16 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
  iter9: A9,
  iter10: A10,
  iter11: A11,
  iter12: A12,
  iter13: A13,
  iter14: A14,
  iter15: A15,
  iter16: A16,
): ReturnIterableIteratorType<
  A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10 | A11 | A12 | A13 | A14 | A15 | A16
>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
  A9 extends Iterable<unknown> | AsyncIterable<unknown>,
  A10 extends Iterable<unknown> | AsyncIterable<unknown>,
  A11 extends Iterable<unknown> | AsyncIterable<unknown>,
  A12 extends Iterable<unknown> | AsyncIterable<unknown>,
  A13 extends Iterable<unknown> | AsyncIterable<unknown>,
  A14 extends Iterable<unknown> | AsyncIterable<unknown>,
  A15 extends Iterable<unknown> | AsyncIterable<unknown>,
  A16 extends Iterable<unknown> | AsyncIterable<unknown>,
  A17 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
  iter9: A9,
  iter10: A10,
  iter11: A11,
  iter12: A12,
  iter13: A13,
  iter14: A14,
  iter15: A15,
  iter16: A16,
  iter17: A17,
): ReturnIterableIteratorType<
  A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10 | A11 | A12 | A13 | A14 | A15 | A16 | A17
>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
  A9 extends Iterable<unknown> | AsyncIterable<unknown>,
  A10 extends Iterable<unknown> | AsyncIterable<unknown>,
  A11 extends Iterable<unknown> | AsyncIterable<unknown>,
  A12 extends Iterable<unknown> | AsyncIterable<unknown>,
  A13 extends Iterable<unknown> | AsyncIterable<unknown>,
  A14 extends Iterable<unknown> | AsyncIterable<unknown>,
  A15 extends Iterable<unknown> | AsyncIterable<unknown>,
  A16 extends Iterable<unknown> | AsyncIterable<unknown>,
  A17 extends Iterable<unknown> | AsyncIterable<unknown>,
  A18 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
  iter9: A9,
  iter10: A10,
  iter11: A11,
  iter12: A12,
  iter13: A13,
  iter14: A14,
  iter15: A15,
  iter16: A16,
  iter17: A17,
  iter18: A18,
): ReturnIterableIteratorType<
  A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10 | A11 | A12 | A13 | A14 | A15 | A16 | A17 | A18
>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
  A9 extends Iterable<unknown> | AsyncIterable<unknown>,
  A10 extends Iterable<unknown> | AsyncIterable<unknown>,
  A11 extends Iterable<unknown> | AsyncIterable<unknown>,
  A12 extends Iterable<unknown> | AsyncIterable<unknown>,
  A13 extends Iterable<unknown> | AsyncIterable<unknown>,
  A14 extends Iterable<unknown> | AsyncIterable<unknown>,
  A15 extends Iterable<unknown> | AsyncIterable<unknown>,
  A16 extends Iterable<unknown> | AsyncIterable<unknown>,
  A17 extends Iterable<unknown> | AsyncIterable<unknown>,
  A18 extends Iterable<unknown> | AsyncIterable<unknown>,
  A19 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
  iter9: A9,
  iter10: A10,
  iter11: A11,
  iter12: A12,
  iter13: A13,
  iter14: A14,
  iter15: A15,
  iter16: A16,
  iter17: A17,
  iter18: A18,
  iter19: A19,
): ReturnIterableIteratorType<
  A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10 | A11 | A12 | A13 | A14 | A15 | A16 | A17 | A18 | A19
>;

function concat<
  A1 extends Iterable<unknown> | AsyncIterable<unknown>,
  A2 extends Iterable<unknown> | AsyncIterable<unknown>,
  A3 extends Iterable<unknown> | AsyncIterable<unknown>,
  A4 extends Iterable<unknown> | AsyncIterable<unknown>,
  A5 extends Iterable<unknown> | AsyncIterable<unknown>,
  A6 extends Iterable<unknown> | AsyncIterable<unknown>,
  A7 extends Iterable<unknown> | AsyncIterable<unknown>,
  A8 extends Iterable<unknown> | AsyncIterable<unknown>,
  A9 extends Iterable<unknown> | AsyncIterable<unknown>,
  A10 extends Iterable<unknown> | AsyncIterable<unknown>,
  A11 extends Iterable<unknown> | AsyncIterable<unknown>,
  A12 extends Iterable<unknown> | AsyncIterable<unknown>,
  A13 extends Iterable<unknown> | AsyncIterable<unknown>,
  A14 extends Iterable<unknown> | AsyncIterable<unknown>,
  A15 extends Iterable<unknown> | AsyncIterable<unknown>,
  A16 extends Iterable<unknown> | AsyncIterable<unknown>,
  A17 extends Iterable<unknown> | AsyncIterable<unknown>,
  A18 extends Iterable<unknown> | AsyncIterable<unknown>,
  A19 extends Iterable<unknown> | AsyncIterable<unknown>,
  A20 extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A1,
  iter2: A2,
  iter3: A3,
  iter4: A4,
  iter5: A5,
  iter6: A6,
  iter7: A7,
  iter8: A8,
  iter9: A9,
  iter10: A10,
  iter11: A11,
  iter12: A12,
  iter13: A13,
  iter14: A14,
  iter15: A15,
  iter16: A16,
  iter17: A17,
  iter18: A18,
  iter19: A19,
  iter20: A20,
): ReturnIterableIteratorType<
  A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10 | A11 | A12 | A13 | A14 | A15 | A16 | A17 | A18 | A19 | A20
>;

function concat<A extends Iterable<unknown> | AsyncIterable<unknown>>(...iters: Array<A>) {
  return pipe(iters, flat);
}

export default concat;
