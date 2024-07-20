import { IterableInfer, ReturnIterableType } from '../../types';
import { isAsyncIterable, isIterable } from '../../utils';

function syncEvery<A, B>(fn: (args: A) => B, iter: Iterable<A>): boolean {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { value, done } = iterator.next();

    if (done) return true;

    if (!fn(value)) return false;
  }
}

async function asyncEvery<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): Promise<boolean> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { value, done } = await iterator.next();

    if (done) return true;

    if (!fn(value)) return false;
  }
}

function every<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter: A,
): ReturnIterableType<A, boolean>;

function every<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
): (iter: A) => ReturnIterableType<A, boolean>;

function every<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
): boolean | Promise<boolean> | ((iter: A) => boolean | Promise<boolean>) {
  if (!iter) return (iter: A): boolean | Promise<boolean> => every(fn, iter) as boolean | Promise<boolean>;

  if (isIterable<IterableInfer<A>>(iter)) return syncEvery(fn, iter);

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncEvery(fn, iter);

  throw new Error('argument is not iterable');
}

export default every;
