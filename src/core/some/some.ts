import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableIteratorType } from './../../types';

function* syncSome<A, B>(fn: (args: A) => B, iter: Iterable<A>): IterableIterator<boolean> {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { value, done } = iterator.next();

    if (done) yield false;

    if (fn(value)) {
      yield true;
      break;
    }
  }
}

async function* asyncSome<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<boolean> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { value, done } = await iterator.next();

    if (done) yield false;

    if (fn(value)) {
      yield true;
      break;
    }
  }
}

function some<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter: A,
): ReturnIterableIteratorType<A, boolean>;

function some<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
): (iter: A) => ReturnIterableIteratorType<A, boolean>;

function some<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
): ReturnIterableIteratorType<A, boolean> | ((iter: A) => ReturnIterableIteratorType<A, boolean>) {
  if (!iter)
    return (iter: A): ReturnIterableIteratorType<A, boolean> =>
      some(fn, iter) as ReturnIterableIteratorType<A, boolean>;

  if (isIterable<IterableInfer<A>>(iter)) return syncSome(fn, iter) as ReturnIterableIteratorType<A, boolean>;

  if (isAsyncIterable<IterableInfer<A>>(iter))
    return asyncSome(fn, iter) as ReturnIterableIteratorType<A, boolean>;

  throw new Error('argument is not iterable');
}

export default some;
