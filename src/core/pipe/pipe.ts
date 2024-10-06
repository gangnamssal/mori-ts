import { IsPromise } from '../../types';
import reduce from '../reduce/reduce';

/**
 * @description
 * - 여러 개의 함수를 연결하여 데이터를 처리합니다.
 * - 이 함수는 입력값을 첫 번째 함수에 전달하고, 각 함수의 출력값을 다음 함수의 입력값으로 사용하는 방식으로 작동합니다.
 *
 * @example
 * - 기본 사용법
 * ```
 * const result = pipe(
 *  0, // 초기값
 *  a => a + 1, // 첫 번째 함수
 *  a => a + 10, // 두 번째 함수
 *  a => a + 100 // 세 번째 함수
 * ); // 출력: 111
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/pipe
 */

function pipe<T1, R>(a: T1, f1: (a: Awaited<T1>) => R): IsPromise<T1, R>;

function pipe<T1, T2, R>(a: T1, f1: (a: Awaited<T1>) => T2, f2: (a: T2) => R): IsPromise<T1, R>;

function pipe<T1, T2, T3, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => T9,
  f9: (a: T9) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => T9,
  f9: (a: T9) => T10,
  f10: (a: T10) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => T9,
  f9: (a: T9) => T10,
  f10: (a: T10) => T11,
  f11: (a: T11) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => T9,
  f9: (a: T9) => T10,
  f10: (a: T10) => T11,
  f11: (a: T11) => T12,
  f12: (a: T12) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => T9,
  f9: (a: T9) => T10,
  f10: (a: T10) => T11,
  f11: (a: T11) => T12,
  f12: (a: T12) => T13,
  f13: (a: T13) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => T9,
  f9: (a: T9) => T10,
  f10: (a: T10) => T11,
  f11: (a: T11) => T12,
  f12: (a: T12) => T13,
  f13: (a: T13) => T14,
  f14: (a: T14) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => T9,
  f9: (a: T9) => T10,
  f10: (a: T10) => T11,
  f11: (a: T11) => T12,
  f12: (a: T12) => T13,
  f13: (a: T13) => T14,
  f14: (a: T14) => T15,
  f15: (a: T15) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => T9,
  f9: (a: T9) => T10,
  f10: (a: T10) => T11,
  f11: (a: T11) => T12,
  f12: (a: T12) => T13,
  f13: (a: T13) => T14,
  f14: (a: T14) => T15,
  f15: (a: T15) => T16,
  f16: (a: T16) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => T9,
  f9: (a: T9) => T10,
  f10: (a: T10) => T11,
  f11: (a: T11) => T12,
  f12: (a: T12) => T13,
  f13: (a: T13) => T14,
  f14: (a: T14) => T15,
  f15: (a: T15) => T16,
  f16: (a: T16) => T17,
  f17: (a: T17) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => T9,
  f9: (a: T9) => T10,
  f10: (a: T10) => T11,
  f11: (a: T11) => T12,
  f12: (a: T12) => T13,
  f13: (a: T13) => T14,
  f14: (a: T14) => T15,
  f15: (a: T15) => T16,
  f16: (a: T16) => T17,
  f17: (a: T17) => T18,
  f18: (a: T18) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => T9,
  f9: (a: T9) => T10,
  f10: (a: T10) => T11,
  f11: (a: T11) => T12,
  f12: (a: T12) => T13,
  f13: (a: T13) => T14,
  f14: (a: T14) => T15,
  f15: (a: T15) => T16,
  f16: (a: T16) => T17,
  f17: (a: T17) => T18,
  f18: (a: T18) => T19,
  f19: (a: T19) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: T2) => T3,
  f3: (a: T3) => T4,
  f4: (a: T4) => T5,
  f5: (a: T5) => T6,
  f6: (a: T6) => T7,
  f7: (a: T7) => T8,
  f8: (a: T8) => T9,
  f9: (a: T9) => T10,
  f10: (a: T10) => T11,
  f11: (a: T11) => T12,
  f12: (a: T12) => T13,
  f13: (a: T13) => T14,
  f14: (a: T14) => T15,
  f15: (a: T15) => T16,
  f16: (a: T16) => T17,
  f17: (a: T17) => T18,
  f18: (a: T18) => T19,
  f19: (a: T19) => T20,
  f20: (a: T20) => R,
): IsPromise<T1, R>;

function pipe<T>(arg: any, ...fns: any[]) {
  return reduce((a, f) => f(a), arg, fns);
}

export default pipe;
