import { IterableInfer, ReturnIterableIteratorType } from '../../types';
import { isAsyncIterable, isIterable } from './../../utils';

function* syncDrop<A>(skip: number, iter: Iterable<A>): IterableIterator<A> {
  if (skip <= 0) return yield* iter;

  let count = 0;

  for (const value of iter) {
    if (count++ < skip) continue;
    yield value;
  }
}

async function* asyncDrop<A>(skip: number, iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  if (skip <= 0) return yield* iter;

  let count = 0;

  for await (const value of iter) {
    if (count++ < skip) continue;
    yield value;
  }
}

/**
 * @description
 * - 처음 n개의 요소를 생략하고, 나머지 요소를 반환하는 함수입니다.
 * - 동기 및 비동기 iterable을 모두 지원합니다.
 *
 * @example
 * - 배열에서 사용
 * ```
 * const result = drop(2, [1, 2, 3, 4, 5]);
 * 
 * console.log([...result]); // 출력: [3, 4, 5]
 * console.log(toArray(result)); // 출력: [3, 4, 5]
 * ```
 * 
 * @example
 * - 문자열에서 사용
 * ```
 * const result = drop(2, 'hello');
 * 
 * console.log([...result]); // 출력: ['l', 'l', 'o']
 * console.log(toArray(result)); // 출력: ['l', 'l', 'o']
 * ```
 * 
 * @example
 * - pipe와 함께 사용
 * ```
 * const result = pipe(
 *  [1, 2, 3, 4, 5],
 *  drop(2),
 *  toArray,
 * ); // 출력: [3, 4, 5]
  
 * const result = await pipe(
 *  toAsync,
 *  [1, 2, 3, 4, 5],
 *  drop(2),
 *  toArray,
 * );
 * 
 * console.log(result); // 출력: [3, 4, 5]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/drop
 */

function drop<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  skip: number,
  iter: A,
): ReturnIterableIteratorType<A>;

function drop<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  skip: number,
): (iter: A) => ReturnIterableIteratorType<A>;

function drop<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  skip: number,
  iter?: A,
):
  | IterableIterator<IterableInfer<A>>
  | AsyncIterableIterator<IterableInfer<A>>
  | ((iter: A) => ReturnIterableIteratorType<A>) {
  if (iter === undefined)
    return (iter: A): ReturnIterableIteratorType<A> =>
      drop(skip, iter as any) as ReturnIterableIteratorType<A>;

  if (isIterable(iter)) return syncDrop(skip, iter) as IterableIterator<IterableInfer<A>>;
  if (isAsyncIterable(iter)) return asyncDrop(skip, iter) as AsyncIterableIterator<IterableInfer<A>>;

  throw new Error('Invalid arguments');
}

export default drop;
