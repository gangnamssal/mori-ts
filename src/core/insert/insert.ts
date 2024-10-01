import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableIteratorType } from '../../types';

function syncInsert<A, B>(index: number, insertValue: B, iter: Iterable<A>): IterableIterator<A | B> {
  const iterator = iter[Symbol.iterator]();
  let currentIndex = 0;
  let insertDone = false;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      if (!insertDone && currentIndex === index) {
        insertDone = true;
        return { done: false, value: insertValue };
      }

      const { value, done } = iterator.next();

      if (done) {
        if (!insertDone) {
          insertDone = true;
          return { done: false, value: insertValue };
        }

        return { done: true, value: undefined };
      }

      currentIndex++;
      return { done: false, value };
    },
  };
}

function asyncInsert<A, B>(
  index: number,
  insertValue: B,
  iter: AsyncIterable<A>,
): AsyncIterableIterator<A | B> {
  const iterator = iter[Symbol.asyncIterator]();
  let currentIndex = 0;
  let insertDone = false;

  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    async next() {
      if (!insertDone && currentIndex === index) {
        insertDone = true;
        return { done: false, value: await insertValue };
      }

      const { value, done } = await iterator.next();

      if (done) {
        if (!insertDone) {
          insertDone = true;
          return { done: false, value: await insertValue };
        }

        return { done: true, value: undefined };
      }

      currentIndex++;
      return { done: false, value };
    },
  };
}

type ReturnInsertIterableIteratorType<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B,
> = ReturnIterableIteratorType<A, IterableInfer<A> | B>;

/**
 * @description
 * - 주어진 인덱스에 값을 삽입한 iterable을 반환합니다.
 * - 동기 및 비동기 iterable 모두 지원하며, iterable의 끝에 도달해도 값을 삽입할 수 있습니다.
 * - 삽입되는 값은 Promise로 감싸져 비동기적으로도 처리 가능합니다.
 *
 * @example
 * - 배열에서 사용
 * ```
 * const arr = [1, 2];
 *
 * const result = insert(1, 3, arr);
 * console.log([...result]); // 출력: [1, 3, 2]
 *
 * const result2 = insert(1, 3, arr);
 * console.log(toArray(result2)); // 출력: [1, 3, 2]
 * ```
 *
 * @example
 * - 끝에 값을 삽입
 * ```
 * const arr = [1, 2];
 *
 * const result = insert(5, 3, arr);
 * console.log([...result]); // 출력: [1, 2, 3]
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const iter = [1, 2, 3];
 *
 * const res = pipe(
 *   iter,
 *   insert(2, 4),
 *   toArray,
 * );
 * console.log(res); // 출력: [1, 2, 4, 3]
 *
 * const result = await pipe(
 *   iter,
 *   toAsync,
 *   insert(1, 4),
 *   toArray,
 * );
 * console.log(result); // 출력: [1, 4, 2, 3]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/insert
 */

function insert<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  index: number,
  insertValue: B,
  iter: A,
): ReturnInsertIterableIteratorType<A, B>;

function insert<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  index: number,
  insertValue: B,
): (iter: A) => ReturnInsertIterableIteratorType<A, B>;

function insert<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  index: number,
  insertValue: B,
  iter?: A,
): ReturnInsertIterableIteratorType<A, B> | ((iter: A) => ReturnInsertIterableIteratorType<A, B>) {
  if (iter === undefined)
    return (iter: A): ReturnInsertIterableIteratorType<A, B> =>
      insert(index, insertValue, iter) as ReturnInsertIterableIteratorType<A, B>;

  if (isIterable<A>(iter))
    return syncInsert(index, insertValue, iter) as ReturnInsertIterableIteratorType<A, B>;

  if (isAsyncIterable<A>(iter))
    return asyncInsert(index, insertValue, iter) as ReturnInsertIterableIteratorType<A, B>;

  throw new Error('argument is not valid');
}

export default insert;
