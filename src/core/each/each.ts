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
  if (!iter)
    return (iter: A): ReturnIterableIteratorType<A> => each(fn, iter) as ReturnIterableIteratorType<A>;

  if (isIterable<IterableInfer<A>>(iter)) return syncEach(fn, iter) as ReturnIterableIteratorType<A>;

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncEach(fn, iter) as ReturnIterableIteratorType<A>;

  throw new Error('argument must be an iterable or async iterable');
}

export default each;
