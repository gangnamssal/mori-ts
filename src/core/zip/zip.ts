import { IsNever, IterableInfer } from '../../types';
import { isAsyncIterable, isIterable } from './../../utils';

function* syncZip<A, B>(iter1: Iterable<A>, iter2: Iterable<B>): IterableIterator<[A, B]> {
  const iterator1 = iter1[Symbol.iterator]();
  const iterator2 = iter2[Symbol.iterator]();

  while (true) {
    const { value: value1, done: done1 } = iterator1.next();
    const { value: value2, done: done2 } = iterator2.next();

    if (done1 || done2) break;

    yield [value1, value2];
  }
}

async function* asyncZip<A, B>(
  iter1: AsyncIterable<A>,
  iter2: AsyncIterable<B>,
): AsyncIterableIterator<[A, B]> {
  const iterator1 = iter1[Symbol.asyncIterator]();
  const iterator2 = iter2[Symbol.asyncIterator]();

  while (true) {
    const { value: value1, done: done1 } = await iterator1.next();
    const { value: value2, done: done2 } = await iterator2.next();

    if (done1 || done2) break;

    yield [value1, value2];
  }
}

async function* asyncSyncZip<A, B>(
  iter1: Iterable<A> | AsyncIterable<A>,
  iter2: Iterable<B> | AsyncIterable<B>,
): AsyncIterableIterator<[A, B]> {
  if (isIterable(iter1) && isAsyncIterable(iter2)) {
    const iterator1 = iter1[Symbol.iterator]();
    const iterator2 = iter2[Symbol.asyncIterator]();

    while (true) {
      const { value: value1, done: done1 } = iterator1.next();
      const { value: value2, done: done2 } = await iterator2.next();

      if (done1 || done2) break;

      yield [value1, value2];
    }
  } else if (isAsyncIterable(iter1) && isIterable(iter2)) {
    const iterator1 = iter1[Symbol.asyncIterator]();
    const iterator2 = iter2[Symbol.iterator]();

    while (true) {
      const { value: value1, done: done1 } = await iterator1.next();
      const { value: value2, done: done2 } = iterator2.next();

      if (done1 || done2) break;

      yield [value1, value2];
    }
  }
}

type ZipIterableIterator<A, B> = IterableIterator<true extends IsNever<A> | IsNever<B> ? never : [A, B]>;

type ZipAsyncIterableIterator<A, B> = AsyncIterableIterator<
  true extends IsNever<A> | IsNever<B> ? never : [A, B]
>;

/**
 * @description
 * - 두 개의 iterable(반복 가능한 객체)을 병합하여 각각의 요소를 쌍으로 묶은 새로운 iterable을 생성합니다.
 * - 동기 및 비동기 iterable 모두 지원합니다.
 *
 * @example
 * - 기본 사용법
 * ```
 * const array = [1, 2, 3];
 * const array2 = ['a', 'b', 'c'];
 * 
 * const result = zip(array, array2); // 출력: [[1, 'a'], [2, 'b'], [3, 'c']]
 * ```
 *
 * @example
 * - 길이가 다른 배열
 * ```
 * const array = [1, 2, 3];
 * const array2 = ['a', 'b'];
 * 
 * const result1 = zip(array, array2); // 출력: [[1, 'a'], [2, 'b']]
 *
 * const array3 = ['a', 'b', 'c'];
 * const array4 = [1, 2];
 * const result2 = zip(array4, array3); // 출력: [[1, 'a'], [2, 'b']]
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const iter1 = [1, 2, 3];
 * const iter2 = ['a', 'b', 'c'];

 * const res = pipe(iter2, zip(iter1), toArray); // 결과: [[1, 'a'], [2, 'b'], [3, 'c']]

 * const res2 = await pipe(iter2, toAsync, zip(iter1), toArray); // 결과: [[1, 'a'], [2, 'b'], [3, 'c']]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/zip
 */

function zip<A, B>(iter1: Iterable<A>, iter2: Iterable<B>): ZipIterableIterator<A, B>;

function zip<A, B>(iter1: AsyncIterable<A>, iter2: AsyncIterable<B>): ZipAsyncIterableIterator<A, B>;

function zip<A, B>(iter1: Iterable<A>, iter2: AsyncIterable<B>): ZipAsyncIterableIterator<A, B>;

function zip<A, B>(iter1: AsyncIterable<A>, iter2: Iterable<B>): ZipAsyncIterableIterator<A, B>;

function zip<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A,
): (
  iter2: B,
) => A extends AsyncIterable<unknown>
  ? ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>
  : B extends AsyncIterable<unknown>
    ? ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>
    : ZipIterableIterator<IterableInfer<A>, IterableInfer<B>>;

function zip<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A,
  iter2?: B,
):
  | ZipIterableIterator<IterableInfer<A>, IterableInfer<B>>
  | ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>
  | ((
      iter: B,
    ) =>
      | ZipIterableIterator<IterableInfer<A>, IterableInfer<B>>
      | ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>) {
  if (iter2 === undefined)
    return (
      iter2: B,
    ):
      | ZipIterableIterator<IterableInfer<A>, IterableInfer<B>>
      | ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>> =>
      zip(iter1 as any, iter2 as any) as
        | ZipIterableIterator<IterableInfer<A>, IterableInfer<B>>
        | ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>;

  if (isIterable(iter1) && isIterable(iter2))
    return syncZip(iter1, iter2) as ZipIterableIterator<IterableInfer<A>, IterableInfer<B>>;

  if (isAsyncIterable(iter1) && isAsyncIterable(iter2))
    return asyncZip(iter1, iter2) as ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>;

  if ((isAsyncIterable(iter1) && isIterable(iter2)) || (isIterable(iter1) && isAsyncIterable(iter2)))
    return asyncSyncZip(iter1, iter2) as ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>;

  throw new Error('Invalid arguments');
}

export default zip;
