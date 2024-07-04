import { IsPromise } from '../../types';
import reduce from '../reduce/reduce';

function pipe<T1, R>(a: T1, f1: (a: Awaited<T1>) => R): IsPromise<T1, R>;

function pipe<T1, T2, R>(a: T1, f1: (a: Awaited<T1>) => T2, f2: (a: Awaited<T2>) => R): IsPromise<T1, R>;

function pipe<T1, T2, T3, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => T9,
  f9: (a: Awaited<T9>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => T9,
  f9: (a: Awaited<T9>) => T10,
  f10: (a: Awaited<T10>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => T9,
  f9: (a: Awaited<T9>) => T10,
  f10: (a: Awaited<T10>) => T11,
  f11: (a: Awaited<T11>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => T9,
  f9: (a: Awaited<T9>) => T10,
  f10: (a: Awaited<T10>) => T11,
  f11: (a: Awaited<T11>) => T12,
  f12: (a: Awaited<T12>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => T9,
  f9: (a: Awaited<T9>) => T10,
  f10: (a: Awaited<T10>) => T11,
  f11: (a: Awaited<T11>) => T12,
  f12: (a: Awaited<T12>) => T13,
  f13: (a: Awaited<T13>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => T9,
  f9: (a: Awaited<T9>) => T10,
  f10: (a: Awaited<T10>) => T11,
  f11: (a: Awaited<T11>) => T12,
  f12: (a: Awaited<T12>) => T13,
  f13: (a: Awaited<T13>) => T14,
  f14: (a: Awaited<T14>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => T9,
  f9: (a: Awaited<T9>) => T10,
  f10: (a: Awaited<T10>) => T11,
  f11: (a: Awaited<T11>) => T12,
  f12: (a: Awaited<T12>) => T13,
  f13: (a: Awaited<T13>) => T14,
  f14: (a: Awaited<T14>) => T15,
  f15: (a: Awaited<T15>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => T9,
  f9: (a: Awaited<T9>) => T10,
  f10: (a: Awaited<T10>) => T11,
  f11: (a: Awaited<T11>) => T12,
  f12: (a: Awaited<T12>) => T13,
  f13: (a: Awaited<T13>) => T14,
  f14: (a: Awaited<T14>) => T15,
  f15: (a: Awaited<T15>) => T16,
  f16: (a: Awaited<T16>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => T9,
  f9: (a: Awaited<T9>) => T10,
  f10: (a: Awaited<T10>) => T11,
  f11: (a: Awaited<T11>) => T12,
  f12: (a: Awaited<T12>) => T13,
  f13: (a: Awaited<T13>) => T14,
  f14: (a: Awaited<T14>) => T15,
  f15: (a: Awaited<T15>) => T16,
  f16: (a: Awaited<T16>) => T17,
  f17: (a: Awaited<T17>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => T9,
  f9: (a: Awaited<T9>) => T10,
  f10: (a: Awaited<T10>) => T11,
  f11: (a: Awaited<T11>) => T12,
  f12: (a: Awaited<T12>) => T13,
  f13: (a: Awaited<T13>) => T14,
  f14: (a: Awaited<T14>) => T15,
  f15: (a: Awaited<T15>) => T16,
  f16: (a: Awaited<T16>) => T17,
  f17: (a: Awaited<T17>) => T18,
  f18: (a: Awaited<T18>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => T9,
  f9: (a: Awaited<T9>) => T10,
  f10: (a: Awaited<T10>) => T11,
  f11: (a: Awaited<T11>) => T12,
  f12: (a: Awaited<T12>) => T13,
  f13: (a: Awaited<T13>) => T14,
  f14: (a: Awaited<T14>) => T15,
  f15: (a: Awaited<T15>) => T16,
  f16: (a: Awaited<T16>) => T17,
  f17: (a: Awaited<T17>) => T18,
  f18: (a: Awaited<T18>) => T19,
  f19: (a: Awaited<T19>) => R,
): IsPromise<T1, R>;

function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, R>(
  a: T1,
  f1: (a: Awaited<T1>) => T2,
  f2: (a: Awaited<T2>) => T3,
  f3: (a: Awaited<T3>) => T4,
  f4: (a: Awaited<T4>) => T5,
  f5: (a: Awaited<T5>) => T6,
  f6: (a: Awaited<T6>) => T7,
  f7: (a: Awaited<T7>) => T8,
  f8: (a: Awaited<T8>) => T9,
  f9: (a: Awaited<T9>) => T10,
  f10: (a: Awaited<T10>) => T11,
  f11: (a: Awaited<T11>) => T12,
  f12: (a: Awaited<T12>) => T13,
  f13: (a: Awaited<T13>) => T14,
  f14: (a: Awaited<T14>) => T15,
  f15: (a: Awaited<T15>) => T16,
  f16: (a: Awaited<T16>) => T17,
  f17: (a: Awaited<T17>) => T18,
  f18: (a: Awaited<T18>) => T19,
  f19: (a: Awaited<T19>) => T20,
  f20: (a: Awaited<T20>) => R,
): IsPromise<T1, R>;

function pipe<T>(arg: any, ...fns: any[]) {
  return reduce((a, f) => f(a), arg, fns);
}

export default pipe;
