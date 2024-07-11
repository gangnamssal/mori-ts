import { IterableInfer, IterableRecurInfer } from './../../types';
import { isAsyncIterable, isIterable } from './../../utils';

function* syncFlat<A extends Iterable<unknown>>(iter: A): IterableIterator<IterableRecurInfer<A>> {
  for (const item of iter) {
    if (isIterable(item) || isAsyncIterable(item))
      yield* syncFlat(item as A) as IterableIterator<IterableRecurInfer<A>>;
    else yield item as IterableRecurInfer<A>;
  }
}

async function* asyncFlat<A extends AsyncIterable<unknown>>(
  iter: A,
): AsyncIterableIterator<IterableRecurInfer<A>> {
  for await (const item of iter) {
    if (isAsyncIterable(item) || isIterable(item))
      yield* asyncFlat(item as A) as AsyncIterableIterator<IterableRecurInfer<A>>;
    else yield item as IterableRecurInfer<A>;
  }
}

function flat<A extends Iterable<unknown>>(iter: A): IterableIterator<IterableRecurInfer<A>>;
function flat<A extends AsyncIterable<unknown>>(iter: A): AsyncIterableIterator<IterableRecurInfer<A>>;

function flat<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): IterableIterator<IterableRecurInfer<A>> | AsyncIterableIterator<IterableRecurInfer<A>> {
  if (isIterable<IterableInfer<A>>(iter)) return syncFlat(iter);
  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncFlat(iter);

  throw new Error('argument is not iterable');
}

export default flat;
