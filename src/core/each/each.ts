import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableIteratorType } from './../../types';

function* syncEach<A, R>(fn: (args: A) => R, iter: Iterable<A>): IterableIterator<A> {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { value, done } = iterator.next();

    if (done) break;

    fn(value);

    yield value;
  }
}

async function* asyncEach<A, R>(fn: (args: A) => R, iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { value, done } = await iterator.next();

    if (done) break;

    fn(value);

    yield value;
  }
}

/**
 * @description
 * - 각 요소에 대해 지정된 함수를 실행하는 고차 함수입니다.
 * - 원본 iterable을 변경하지 않고 그대로 반환합니다.
 *
 * @example
 * - iterable에서 사용
 * ```
 * const arr = [1, 2, 3];
 * let sum = 0;
 *
 * each(x => sum += x, arr);
 *
 * console.log(sum); // 출력: 6
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const arr = [1, 2, 3];
 *
 * const logMessage = (message) => {
 *  console.log(message);
 * };
 *
 * const res = pipe(arr, each(logMessage), toArray); // 콘솔 출력: 1, 2, 3
 *
 * console.log(res); // 출력: [1, 2, 3]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/each
 */

function each<A extends Iterable<unknown> | AsyncIterable<unknown>, R>(
  fn: (args: IterableInfer<A>) => R,
  iter: A,
): ReturnIterableIteratorType<A>;

function each<A extends Iterable<unknown> | AsyncIterable<unknown>, R>(
  fn: (args: IterableInfer<A>) => R,
): (iter: A) => ReturnIterableIteratorType<A>;

function each<A extends Iterable<unknown> | AsyncIterable<unknown>, R>(
  fn: (args: IterableInfer<A>) => R,
  iter?: A,
): ReturnIterableIteratorType<A> | ((iter: A) => ReturnIterableIteratorType<A>) {
  if (iter === undefined)
    return (iter: A): ReturnIterableIteratorType<A> => each(fn, iter) as ReturnIterableIteratorType<A>;

  if (isIterable<IterableInfer<A>>(iter)) return syncEach(fn, iter) as ReturnIterableIteratorType<A>;

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncEach(fn, iter) as ReturnIterableIteratorType<A>;

  throw new Error('argument must be an iterable or async iterable');
}

export default each;
