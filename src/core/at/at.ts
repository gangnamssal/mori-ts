import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableAsyncIterableType } from '../../types';
import toValue from '../to-value/to-value';
import reverse from '../reverse/reverse';

function* syncAt<A>(index: number, iter: Iterable<A>): IterableIterator<A | undefined> {
  const iterator = iter[Symbol.iterator]();
  let count = 0;

  while (true) {
    const { value, done } = iterator.next();

    if (done) break;

    if (index === count) {
      yield value;

      break;
    }

    count++;
  }
}

async function* asyncAt<A>(index: number, iter: AsyncIterable<A>): AsyncIterableIterator<A | undefined> {
  const iterator = iter[Symbol.asyncIterator]();
  let count = 0;

  while (true) {
    const { value, done } = await iterator.next();

    if (done) break;

    if (index === count) {
      yield value;

      break;
    }

    count++;
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
): ReturnIterableAsyncIterableType<A, IterableInfer<A> | undefined>;

function at<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  index: number,
): (iter: A) => ReturnIterableAsyncIterableType<A, IterableInfer<A> | undefined>;

function at<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  index: number,
  iter?: A,
):
  | ReturnIterableAsyncIterableType<A, IterableInfer<A> | undefined>
  | ((iter: A) => ReturnIterableAsyncIterableType<A, IterableInfer<A> | undefined>) {
  if (iter === undefined)
    return (iter: A): ReturnIterableAsyncIterableType<A, IterableInfer<A> | undefined> =>
      at(index, iter) as ReturnIterableAsyncIterableType<A, IterableInfer<A> | undefined>;

  const isIndexMinus = index < 0;

  const iterable = isIndexMinus ? reverse(iter) : iter;

  const indexNumber = isIndexMinus ? -index - 1 : index;

  if (isIterable<IterableInfer<A>>(iterable))
    return toValue(syncAt(indexNumber, iterable)) as ReturnIterableAsyncIterableType<
      A,
      IterableInfer<A> | undefined
    >;

  if (isAsyncIterable<IterableInfer<A>>(iterable))
    return toValue(asyncAt(indexNumber, iterable)) as ReturnIterableAsyncIterableType<
      A,
      IterableInfer<A> | undefined
    >;

  throw new Error('arguments is not iterable, at');
}

export default at;
