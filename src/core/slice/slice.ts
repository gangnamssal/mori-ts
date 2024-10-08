import { isAsyncIterable, isIterable } from './../../utils';
import { ReturnIterableIteratorType } from './../../types';

function* syncSlice<A>(start: number, end: number | Iterable<A>, iter?: Iterable<A>): IterableIterator<A> {
  const items: A[] = Array.from((iter ?? end) as Iterable<A>);
  const len = items.length;

  let count = 0;

  start = start < 0 ? Math.max(len + start, 0) : start;
  end = typeof end === 'number' ? (end < 0 ? Math.max(len + end, 0) : end) : len;

  while (count < end && start < end) {
    if (count >= start) yield items[count];
    count++;
  }
}

async function* asyncSlice<A>(
  start: number,
  end: number | AsyncIterable<A>,
  iter?: AsyncIterable<A>,
): AsyncIterableIterator<A> {
  const items: A[] = [];
  let count = 0;
  let len = 0;

  for await (const value of (iter ?? end) as AsyncIterable<A>) {
    items.push(value);
    len++;
  }

  start = start < 0 ? Math.max(len + start, 0) : start;
  end = typeof end === 'number' ? (end < 0 ? Math.max(len + end, 0) : end) : len;

  while (count < end && start < end) {
    if (count >= start) yield items[count];
    count++;
  }
}

/**
 * @description
 * - 주어진 범위에 해당하는 요소들을 잘라서 반환하는 함수입니다.
 * - 동기 및 비동기 iterable 모두 지원합니다.
 * - `start` 또는 `end`에 음수 값을 넣으면, 해당 값은 iterable의 끝에서부터 계산됩니다.
 *
 * @example
 * - 기본 사용법 (동기 iterable)
 * ```
 * const arr = [1, 2, 3, 4, 5];
 *
 * const result = [...slice(1, 3, arr)]; // 출력: [2, 3]
 * ```
 *
 * @example
 * - 음수 값 사용
 * ```
 * const arr = [1, 2, 3, 4, 5];
 *
 * const result = [...slice(-3, -1, arr)]; // 출력: [3, 4]
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const array = [1, 2, 3, 4, 5];
 *
 * const result = pipe(
 *  array,
 *  map(item => item * 2),
 *  slice(1, 3)
 * ); // 출력: [4, 6]
 *
 * const result = await pipe(
 *  toAsync,
 *  array,
 *  map(item => item * 2),
 *  slice(-2, -1)
 * ); // 출력: [8]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/slice
 */

function slice<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
  end: number,
  iter: A,
): ReturnIterableIteratorType<A>;

function slice<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
  end: A,
): ReturnIterableIteratorType<A>;

function slice<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
  end: number,
): (iter: A) => ReturnIterableIteratorType<A>;

function slice<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
): (iter: A) => ReturnIterableIteratorType<A>;

function slice<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
  end?: number | A,
  iter?: A,
): ReturnIterableIteratorType<A> | ((iter: A) => ReturnIterableIteratorType<A>) {
  if (iter === undefined && typeof end === 'number') {
    return (iter: A): ReturnIterableIteratorType<A> =>
      slice(start, end, iter) as ReturnIterableIteratorType<A>;
  }

  if (iter === undefined && end === undefined) {
    return (iter: A): ReturnIterableIteratorType<A> => slice(start, iter) as ReturnIterableIteratorType<A>;
  }

  if (isIterable<A>(iter) && typeof end === 'number') {
    return syncSlice(start, end, iter) as ReturnIterableIteratorType<A>;
  }

  if (isIterable<A>(end)) {
    return syncSlice(start, end) as ReturnIterableIteratorType<A>;
  }

  if (isAsyncIterable<A>(iter) && typeof end === 'number') {
    return asyncSlice(start, end, iter) as ReturnIterableIteratorType<A>;
  }

  if (isAsyncIterable<A>(end)) {
    return asyncSlice(start, end) as ReturnIterableIteratorType<A>;
  }

  throw new Error('arguments are not valid.');
}

export default slice;
