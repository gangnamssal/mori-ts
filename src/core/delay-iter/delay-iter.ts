import { IterableInfer } from '../../types';
import { isAsyncIterable, isIterable } from '../../utils';

async function* syncDelayIter<A>(time: number, iter: Iterable<A>): AsyncIterableIterator<A> {
  await new Promise(resolve => setTimeout(resolve, time));

  yield* iter;
}

async function* asyncDelayIter<A>(time: number, iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  await new Promise(resolve => setTimeout(resolve, time));

  yield* iter;
}

function delayIter<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  time: number,
  iter: A,
): AsyncIterableIterator<IterableInfer<A>>;

function delayIter<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  time: number,
): (iter: A) => AsyncIterableIterator<IterableInfer<A>>;

function delayIter<A extends Iterable<unknown> | AsyncIterable<unknown>>(time: number, iter?: A) {
  if (!iter) return (iter: A) => delayIter(time, iter);

  if (isIterable<IterableInfer<A>>(iter)) return syncDelayIter(time, iter);

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncDelayIter(time, iter);

  throw new Error('argument must be an iterable or async iterable');
}

export default delayIter;
