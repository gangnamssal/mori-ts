import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableAsyncIterableType } from '../../types';
import toValue from '../to-value/to-value';

function* syncAt<A>(index: number, iter: Iterable<A>): IterableIterator<A | undefined> {
  if (index === 0) {
    const iterator = iter[Symbol.iterator]();
    const result = iterator.next();

    yield result.done ? undefined : result.value;
  }

  let count = 0;
  let cache: A[] | null = index < 0 ? [] : null;

  for (const item of iter) {
    if (index >= 0 && count === index) yield item;

    if (cache) cache.push(item);

    count++;
  }

  if (index < 0 && cache) {
    const adjustedIndex = count + index;

    if (adjustedIndex >= 0 && adjustedIndex < count) yield cache[adjustedIndex];
  }
}

async function* asyncAt<A>(index: number, iter: AsyncIterable<A>): AsyncIterableIterator<A | undefined> {
  if (index === 0) {
    const iterator = iter[Symbol.asyncIterator]();
    const result = await iterator.next();
    yield result.done ? undefined : result.value;
  }

  let count = 0;
  const negativeIndex = index < 0;
  let items: A[] = [];

  for await (const item of iter) {
    if (!negativeIndex && count === index) yield item;

    items.push(item);
    count++;
  }

  if (negativeIndex) {
    index = items.length + index;
    if (index < 0 || index >= items.length) yield undefined;

    yield items[index];
  }
}

/**
 * @description
 * - 주어진 인덱스에 해당하는 요소를 반환합니다.
 * - 인덱스가 음수일 경우, 배열의 끝에서부터 요소를 반환합니다.
 * - 동기 및 비동기 iterable 모두를 지원합니다.
 * 
 * @example 
 * - 배열에서 요소 가져오기
 * ```
 * const array = [1, 2, 3];
 *
 * const firstElement = at(0, array); // 출력: 1
 *
 * const lastElement = at(-1, array); // 출력: 3
 * ```
 * 
 * @example 
 * - 파이프라인과 함께 사용하기
 * ```
 * const array = [1, 2, 3];
 * 
 * const result = pipe(
 *  array,
 *  map(x => x * 2),
 *  filter(x => x > 2),
 *  at(0)
 * ); // 출력: 4

 * const asyncResult = await pipe(
 *  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
 *  toAsync,
 *  map(x => x * 2),
 *  at(-1)
 * ); // 출력: 6
 * ```
 * 
 * @url https://github.com/gangnamssal/mori-ts/wiki/at
*/

function at<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  index: number,
  iter: A,
): ReturnIterableAsyncIterableType<A> | undefined;

function at<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  index: number,
): (iter: A) => ReturnIterableAsyncIterableType<A> | undefined;

function at<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  index: number,
  iter?: A,
):
  | ReturnIterableAsyncIterableType<A>
  | undefined
  | ((iter: A) => ReturnIterableAsyncIterableType<A> | undefined) {
  if (iter === undefined)
    return (iter: A): ReturnIterableAsyncIterableType<A> | undefined =>
      at(index, iter) as ReturnIterableAsyncIterableType<A> | undefined;

  if (isIterable<IterableInfer<A>>(iter))
    return toValue(syncAt(index, iter)) as ReturnIterableAsyncIterableType<A> | undefined;

  if (isAsyncIterable<IterableInfer<A>>(iter))
    return toValue(asyncAt(index, iter)) as ReturnIterableAsyncIterableType<A> | undefined;

  throw new Error('arguments is not iterable, at');
}

export default at;
