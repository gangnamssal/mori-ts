import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableType } from './../../types';

function syncSome<A, B>(fn: (args: A) => B, iter: Iterable<A>): boolean {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { value, done } = iterator.next();

    if (done) return false;

    if (fn(value)) return true;
  }
}

async function asyncSome<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): Promise<boolean> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { value, done } = await iterator.next();

    if (done) return false;

    if (fn(value)) return true;
  }
}

/**
 * @description
 * - 주어진 조건을 만족하는 요소가 iterable 객체에 존재하는지를 검사합니다.
 * - 조건이 참인 요소가 하나라도 있으면 true를 반환하고, 그렇지 않으면 false를 반환합니다.
 * - 동기 및 비동기 iterable 모두 지원합니다.
 *
 * @example
 * - 기본 사용법
 * ```
 * const arr = [1, 2, 3, 4, 5];
 *
 * const result = some(item => item > 3, arr); // 출력: true
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
 *  filter(item => item > 5),
 *  some(item => item > 10)
 * ); // 출력: false
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/some
 */

function some<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter: A,
): ReturnIterableType<A, boolean>;

function some<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
): (iter: A) => ReturnIterableType<A, boolean>;

function some<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
): boolean | Promise<boolean> | ((iter: A) => boolean | Promise<boolean>) {
  if (!iter) return (iter: A): boolean | Promise<boolean> => some(fn, iter) as boolean | Promise<boolean>;

  if (isIterable<IterableInfer<A>>(iter)) return syncSome(fn, iter);

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncSome(fn, iter);

  throw new Error('argument is not iterable');
}

export default some;
