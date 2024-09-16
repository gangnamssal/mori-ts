import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableAsyncIterableType } from '../../types';

function syncAt<A>(index: number, iter: Iterable<A>): A | undefined {
  if (index === 0) {
    const iterator = iter[Symbol.iterator]();
    const result = iterator.next();
    return result.done ? undefined : result.value;
  }

  let count = 0;
  let cache: A[] | null = index < 0 ? [] : null;

  for (const item of iter) {
    if (index >= 0) {
      if (count === index) return item;
    } else {
      if (cache) {
        cache.push(item);
      }
    }
    count++;
  }

  if (index < 0 && cache) {
    const adjustedIndex = count + index;
    if (adjustedIndex >= 0 && adjustedIndex < count) {
      return cache[adjustedIndex];
    }
  }

  return undefined;
}

async function asyncAt<A>(index: number, iter: AsyncIterable<A>): Promise<A | undefined> {
  if (index === 0) {
    const iterator = iter[Symbol.asyncIterator]();
    const result = await iterator.next();
    return result.done ? undefined : result.value;
  }

  let count = 0;
  const negativeIndex = index < 0;
  let items: A[] = [];

  for await (const item of iter) {
    if (!negativeIndex) {
      if (count === index) return item;
    } else {
      items.push(item);
    }
    count++;
  }

  if (negativeIndex) {
    index = items.length + index;
    if (index < 0 || index >= items.length) return undefined;
    return items[index];
  }

  return undefined;
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

function at<A extends Iterable<unknown> | AsyncIterable<unknown>>(index: number, iter?: A) {
  if (!iter) return (iter: A): IterableInfer<A> => at(index, iter) as IterableInfer<A>;

  if (isIterable<IterableInfer<A>>(iter)) return syncAt(index, iter);
  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncAt(index, iter);

  return undefined;
}

export default at;
