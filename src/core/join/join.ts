import { IterableInfer, ReturnIterableType } from '../../types';
import { isAsyncIterable, isIterable } from '../../utils';
import reduce from '../reduce/reduce';

function syncJoin<A>(sep: string, iter: Iterable<A>): string {
  return (reduce((a, b) => `${a}${sep}${b}`, iter) || '') as string;
}

async function asyncJoin<A>(sep: string, iter: AsyncIterable<A>): Promise<string> {
  return ((await reduce((a, b) => `${a}${sep}${b}`, iter)) || '') as string;
}

/**
 * @description
 * - iterable의 요소들을 지정된 구분자(separator)로 연결하여 하나의 문자열로 반환합니다.
 * - 동기 및 비동기 iterable 모두 지원합니다.
 *
 * @example
 * - iterable에서 사용
 * ```
 * const array = ['a', 'b', 'c'];
 *
 * const result = join(' ', array); // 출력: 'a b c'
 * ```
 *
 * @example
 * - 다른 구분자 사용
 * ```
 * const array = ['a', 'b', 'c'];
 *
 * const result = join('..', array); // 출력: 'a..b..c'
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const iter = [1, 2, 3];
 *
 * const res = pipe(range(1, 4), map(String), join(',')); // 출력: '1,2,3'
 *
 * const iter2 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *
 * const res = await pipe(iter2, toAsync, join('')); // 출력: '123'
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/join
 */

function join<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  sep: string,
  iter: A,
): ReturnIterableType<A, string>;

function join<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  sep: string,
): (iter: A) => ReturnIterableType<A, string>;

function join<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  sep = ',',
  iter?: A,
): ReturnIterableType<A, string> | ((iter: A) => ReturnIterableType<A, string>) {
  if (!iter) return (iter: A) => join(sep, iter);

  if (isIterable<IterableInfer<A>>(iter)) return syncJoin(sep, iter) as ReturnIterableType<A, string>;
  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncJoin(sep, iter) as ReturnIterableType<A, string>;

  throw new Error('argument is not iterable');
}

export default join;
