import { isAsyncIterable, isIterable } from '../../utils';
import { IterableInfer, ReturnIterableType } from '../../types';

function syncToIterValue<A>(iter: Iterable<A>): A {
  return iter[Symbol.iterator]().next().value;
}

async function asyncToIterValue<A>(iter: AsyncIterable<A>): Promise<A> {
  return (await iter[Symbol.asyncIterator]().next()).value;
}

/**
 * @description
 * - 주어진 iterable 객체에서 값을 추출합니다.
 * - 다른 함수와 조합하여 사용할 수 있습니다
 *
 * @example
 * - 기본 사용법
 * ```
 * const iter = [1, 2, 3];
 *
 * const res = map(x => x * 2, iter);
 *
 * console.log(toIterValue(res)); // 2
 * console.log(toIterValue(res)); // 4
 * console.log(toIterValue(res)); // 6
 * ```
 *
 * @example
 * - 비동기 iterable 처리
 * ```
 * const iter = [1, 2, 3];
 *
 * const res = toAsync(map(x => x * 2, iter));
 *
 * console.log(await toIterValue(res)); // 2
 * console.log(await toIterValue(res)); // 4
 * console.log(await toIterValue(res)); // 6
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/toIterValue
 */

function toIterValue<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): ReturnIterableType<A, IterableInfer<A>>;

function toIterValue<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): IterableInfer<A> | Promise<IterableInfer<A>> {
  if (isIterable<IterableInfer<A>>(iter)) return syncToIterValue(iter) as IterableInfer<A>;
  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncToIterValue(iter) as Promise<IterableInfer<A>>;

  throw new Error('argument is not iterable');
}

export default toIterValue;
