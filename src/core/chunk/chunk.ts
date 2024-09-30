import { IsNever, IterableInfer, ReturnIterableIteratorType } from '../../types';
import { isAsyncIterable, isIterable } from '../../utils';
import take from '../take/take';
import toArray from '../to-array/to-array';

function* syncChunk<A>(size: number, iter: Iterable<A>): IterableIterator<A[]> {
  if (size <= 0) return;

  const iterator = iter[Symbol.iterator]();

  while (true) {
    const arr = toArray(
      take(size, {
        [Symbol.iterator]() {
          return iterator;
        },
      }),
    );

    if (arr.length) yield arr;
    if (arr.length < size) break;
  }
}

async function* asyncChunk<A>(size: number, iter: AsyncIterable<A>): AsyncIterableIterator<A[]> {
  if (size <= 0) return;

  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const arr = await toArray(
      take(size, {
        [Symbol.asyncIterator]() {
          return iterator;
        },
      }),
    );

    if (arr.length) yield arr;
    if (arr.length < size) break;
  }
}

/**
 * @description
 * - 주어진 동기 및 비동기 iterable를 지정된 크기만큼의 배열로 나누어 반환합니다.
 * - 동기 및 비동기 iterable 모두를 지원합니다.
 * 
 * @example 
 * - 배열을 일정 크기로 나누기
 * ```
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 *
 * const result = chunk(2, array);
 * 
 * console.log([...result]); // 출력: [[1, 2], [3, 4], [5, 6], [7, 8], [9]]
 * console.log(toArray(result)); // 출력: [[1, 2], [3, 4], [5, 6], [7, 8], [9]]
 * ```
 * 
 * @example 
 * - 파이프라인과 함께 사용하기
 * ```
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * 
 * const result = pipe(
 *  array,
 *  map(x => x * 2),
 *  chunk(2),
 *  toArray
 * ); // 출력: [[2, 4], [6, 8], [10, 12], [14, 16], [18]]

 * const asyncResult = await pipe(
 *  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3), Promise.resolve(4)],
 *  toAsync,
 *  map(x => x * 2),
 *  chunk(2),
 *  toArray
 * ); // 출력: [[2, 4], [6, 8]]
 * ```
 * 
 * @url https://github.com/gangnamssal/mori-ts/wiki/chunk
*/

function chunk<S extends number, A extends Iterable<unknown> | AsyncIterable<unknown>>(
  size: S,
  iter: A,
): ReturnIterableIteratorType<
  A,
  IsNever<IterableInfer<A>> extends true ? never : S extends 0 ? never : IterableInfer<A>[]
>;

function chunk<S extends number, A extends Iterable<unknown> | AsyncIterable<unknown>>(
  size: S,
): (
  iter: A,
) => ReturnIterableIteratorType<
  A,
  IsNever<IterableInfer<A>> extends true ? never : S extends 0 ? never : IterableInfer<A>[]
>;

function chunk<S extends number, A extends Iterable<unknown> | AsyncIterable<unknown>>(
  size: S,
  iter?: A,
):
  | IterableIterator<IterableInfer<A>[]>
  | AsyncIterableIterator<IterableInfer<A>[]>
  | ((
      iter: A,
    ) => ReturnIterableIteratorType<
      A,
      IsNever<IterableInfer<A>> extends true ? never : S extends 0 ? never : IterableInfer<A>[]
    >) {
  if (iter === undefined)
    return (
      iter: A,
    ): ReturnIterableIteratorType<
      A,
      IsNever<IterableInfer<A>> extends true ? never : S extends 0 ? never : IterableInfer<A>[]
    > =>
      chunk(size, iter as any) as ReturnIterableIteratorType<
        A,
        IsNever<IterableInfer<A>> extends true ? never : S extends 0 ? never : IterableInfer<A>[]
      >;

  if (isIterable(iter)) return syncChunk(size, iter) as IterableIterator<IterableInfer<A>[]>;
  if (isAsyncIterable(iter)) return asyncChunk(size, iter) as AsyncIterableIterator<IterableInfer<A>[]>;

  throw new Error('argument is not iterable');
}

export default chunk;
