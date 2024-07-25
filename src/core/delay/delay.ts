import { IterableInfer } from '../../types';
import { isAsyncIterable, isIterable } from '../../utils';

async function* syncDelay<A>(time: number, iter: Iterable<A>): AsyncIterableIterator<A> {
  await new Promise(resolve => setTimeout(resolve, time));

  yield* iter;
}

async function* asyncDelay<A>(time: number, iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  await new Promise(resolve => setTimeout(resolve, time));

  yield* iter;
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