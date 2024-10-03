import { ReturnIterableIteratorType } from './../../types';
import { isAsyncIterable, isIterable } from './../../utils';

function* syncReverse<A>(iter: Iterable<A>): IterableIterator<A> {
  const values = Array.from(iter);

  for (let i = values.length - 1; i >= 0; i--) {
    yield values[i]; // 역순으로 요소를 반환
  }
}

async function* asyncReverse<A>(iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  const values: A[] = [];

  for await (const value of iter) {
    values.push(value); // 모든 요소를 배열로 저장
  }
  for (let i = values.length - 1; i >= 0; i--) {
    yield values[i]; // 역순으로 요소를 반환
  }
}

/**
 * @description
 * - iterable 객체의 요소를 역순으로 반환합니다.
 * - 동기 및 비동기 iterable 모두 지원합니다.
 *
 * @example
 * - 기본 사용법
 * ```
 * const result = reverse([1, 2, 3, 4]);
 *
 * console.log([...result]); // 출력: [4, 3, 2, 1]
 * console.log(toArray(result)); // 출력: [4, 3, 2, 1]
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const pipeResult = await pipe(
 *  range(1, 5),
 *  toAsync,
 *  map(a => a * 2),
 *  reverse,
 *  toArray
 * ); // 출력: [8, 6, 4, 2]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/reverse
 */

function reverse<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): ReturnIterableIteratorType<A> {
  if (isIterable(iter)) return syncReverse(iter) as ReturnIterableIteratorType<A>;

  if (isAsyncIterable(iter)) return asyncReverse(iter) as ReturnIterableIteratorType<A>;

  throw new Error('argument must be an iterable or async iterable');
}

export default reverse;
