import { ReturnIterableIteratorType } from './../../types';
import { isAsyncIterable, isIterable } from './../../utils';

function* syncReverse<A>(iter: Iterable<A>): IterableIterator<A> {
  const iteratorInstance = iter[Symbol.iterator]();
  let currentItem = iteratorInstance.next();

  const values: IteratorResult<A>[] = [];

  while (!currentItem.done) {
    values.unshift(currentItem);
    currentItem = iteratorInstance.next();
  }

  while (values.length > 0) {
    const { value, done } = values.shift() as IteratorResult<A>;

    if (done) return;

    yield value;
  }
}

async function* asyncReverse<A>(iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  const iteratorInstance = iter[Symbol.asyncIterator]();
  let currentItem = await iteratorInstance.next();

  const values: IteratorResult<A>[] = [];

  while (!currentItem.done) {
    values.unshift(currentItem);
    currentItem = await iteratorInstance.next();
  }

  while (values.length > 0) {
    const { value, done } = values.shift() as IteratorResult<A>;

    if (done) return;

    yield value;
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
