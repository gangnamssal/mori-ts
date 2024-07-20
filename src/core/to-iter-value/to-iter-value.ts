import { isAsyncIterable, isIterable } from '../../utils';
import { IterableInfer } from '../../types';

function syncToIterValue<A>(iter: Iterable<A>): A {
  return iter[Symbol.iterator]().next().value;
}

async function asyncToIterValue<A>(iter: AsyncIterable<A>): Promise<A> {
  return (await iter[Symbol.asyncIterator]().next()).value;
}

function toIterValue<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): A extends Iterable<unknown> ? IterableInfer<A> : Promise<IterableInfer<A>>;

function toIterValue<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): IterableInfer<A> | Promise<IterableInfer<A>> {
  if (isIterable<IterableInfer<A>>(iter)) return syncToIterValue(iter) as IterableInfer<A>;
  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncToIterValue(iter) as Promise<IterableInfer<A>>;

  throw new Error('argument is not iterable');
}

export default toIterValue;
