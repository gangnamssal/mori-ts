import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableType } from './../../types';
import toValue from '../to-value/to-value';

function* syncFindIndex<A, B>(fn: (arg: A) => B, iter: Iterable<A>): IterableIterator<number> {
  const iterator = iter[Symbol.iterator]();

  let currentIndex = 0;

  while (true) {
    const { value, done } = iterator.next();

    if (done) break;

    if (fn(value)) yield currentIndex;

    currentIndex++;
  }

  return -1;
}

async function* asyncFindIndex<A, B>(
  fn: (arg: A) => B,
  iter: AsyncIterable<A>,
): AsyncIterableIterator<number> {
  const iterator = iter[Symbol.asyncIterator]();

  let currentIndex = 0;

  while (true) {
    const { value, done } = await iterator.next();

    if (done) break;

    if (fn(value)) yield currentIndex;

    currentIndex++;
  }

  return -1;
}

type FindIndexReturnType<A extends Iterable<unknown> | AsyncIterable<unknown>> = ReturnIterableType<
  A,
  number
>;

function findIndex<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (arg: IterableInfer<A>) => B,
  iter: A,
): FindIndexReturnType<A>;

function findIndex<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (arg: IterableInfer<A>) => B,
): (iter: A) => FindIndexReturnType<A>;

function findIndex<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (arg: IterableInfer<A>) => B,
  iter?: A,
): FindIndexReturnType<A> | ((iter: A) => FindIndexReturnType<A>) {
  if (iter === undefined)
    return (iter: A): FindIndexReturnType<A> => findIndex(fn, iter) as FindIndexReturnType<A>;

  if (isIterable<IterableInfer<A>>(iter)) return toValue(syncFindIndex(fn, iter)) as FindIndexReturnType<A>;

  if (isAsyncIterable<IterableInfer<A>>(iter))
    return toValue(asyncFindIndex(fn, iter)) as FindIndexReturnType<A>;

  throw new Error('argument is not valid, findIndex only works with sync and async iterables');
}

export default findIndex;
