import { IterableInfer, IterableRecurInfer, ReturnIterableIteratorType } from './../../types';
import { isAsyncIterable, isIterable } from './../../utils';

function* syncFlat<A extends Iterable<unknown>>(iter: A): IterableIterator<IterableRecurInfer<A>> {
  for (const item of iter) {
    if (typeof item !== 'string' && (isIterable(item) || isAsyncIterable(item)))
      yield* syncFlat(item as any) as IterableIterator<IterableRecurInfer<A>>;
    else yield item as IterableRecurInfer<A>;
  }
}

async function* asyncFlat<A extends AsyncIterable<unknown>>(
  iter: A,
): AsyncIterableIterator<IterableRecurInfer<A>> {
  for await (const item of iter) {
    if (typeof item !== 'string' && (isAsyncIterable(item) || isIterable(item)))
      yield* asyncFlat(item as A) as AsyncIterableIterator<IterableRecurInfer<A>>;
    else yield item as IterableRecurInfer<A>;
  }
}

/**
 * @description
 * - 중첩된 iterable을 평평하게 만들어 단일 레벨의 iterable로 변환합니다.
 * - 깊이의 제어 없이 배열을 단일 레벨로 펼칩니다.
 * - 동기 및 비동기 iterable 모두 지원합니다.
 *
 * @example
 * - iterable에서 사용
 * ```
 * const array = [[1], [2], [3]];
 *
 * const iter = flat(array);
 *
 * console.log([...iter]); // 출력: [1, 2, 3]
 * console.log(toArray(iter)); // 출력: [1, 2, 3]
 * ```
 *
 * @example
 * - 다양한 깊이의 배열에서 사용
 * ```
 * const array = [[[1]], [2, 3], [4, [5]], [6]];
 *
 * const iter = flat(array);
 *
 * console.log([...iter]); // 출력: [1, 2, 3, 4, 5, 6]
 * console.log(toArray(iter)); // 출력: [1, 2, 3, 4, 5, 6]
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const iter = [[1], [2], [3]];
 *
 * const res = await pipe(iter, flat, toArray); // 출력: [1, 2, 3]
 *
 * const iter2 = [Promise.resolve([1]), Promise.resolve([2]), Promise.resolve([3])];
 *
 * const res2 = pipe(iter2, toAsync, flat, toArray); // 출력: [1, 2, 3]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/flat
 */

function flat<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): ReturnIterableIteratorType<A, IterableRecurInfer<A>> {
  if (isIterable<IterableInfer<A>>(iter))
    return syncFlat(iter) as ReturnIterableIteratorType<A, IterableRecurInfer<A>>;

  if (isAsyncIterable<IterableInfer<A>>(iter))
    return asyncFlat(iter) as ReturnIterableIteratorType<A, IterableRecurInfer<A>>;

  throw new Error('argument is not iterable');
}

export default flat;
