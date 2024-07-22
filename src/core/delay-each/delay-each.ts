import { IterableInfer } from '../../types';
import { isAsyncIterable, isIterable } from '../../utils';

async function* syncDelay<A>(time: number, iter: Iterable<A>): AsyncIterableIterator<A> {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { value, done } = iterator.next();

    if (done) break;

    await new Promise(resolve => setTimeout(resolve, time));

    yield value;
  }
}

async function* asyncDelay<A>(time: number, iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { value, done } = await iterator.next();

    if (done) break;

    await new Promise(resolve => setTimeout(resolve, time));

    yield value;
  }
}

function delay<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  time: number,
  iter: A,
): AsyncIterableIterator<IterableInfer<A>>;

function delay<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  time: number,
): (iter: A) => AsyncIterableIterator<IterableInfer<A>>;

function delay<A extends Iterable<unknown> | AsyncIterable<unknown>>(time: number, iter?: A) {
  if (!iter) return (iter: A) => delay(time, iter);

  if (isIterable<IterableInfer<A>>(iter)) return syncDelay(time, iter);

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncDelay(time, iter);

  throw new Error('argument must be an iterable or async iterable');
}

export default delay;
