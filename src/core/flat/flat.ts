import { IterableInfer, IterableRecurInfer, ReturnIterableIteratorType } from './../../types';
import { isAsyncIterable, isIterable } from './../../utils';

function* syncFlat<A extends Iterable<unknown>>(iter: A): IterableIterator<IterableRecurInfer<A>> {
  for (const item of iter) {
    if (typeof item !== 'string' && (isIterable(item) || isAsyncIterable(item)))
      yield* syncFlat(item as any) as IterableIterator<IterableRecurInfer<A>>;
    else yield item as IterableRecurInfer<A>;
  }
}

async function* asyncFlat<A extends AsyncIterable<unknown>>(
  iter: A,
): AsyncIterableIterator<IterableRecurInfer<A>> {
  for await (const item of iter) {
    if (typeof item !== 'string' && (isAsyncIterable(item) || isIterable(item)))
      yield* asyncFlat(item as A) as AsyncIterableIterator<IterableRecurInfer<A>>;
    else yield item as IterableRecurInfer<A>;
  }
}

function flat<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): ReturnIterableIteratorType<A, IterableRecurInfer<A>> {
  if (isIterable<IterableInfer<A>>(iter))
    return syncFlat(iter) as ReturnIterableIteratorType<A, IterableRecurInfer<A>>;

  if (isAsyncIterable<IterableInfer<A>>(iter))
    return asyncFlat(iter) as ReturnIterableIteratorType<A, IterableRecurInfer<A>>;

  throw new Error('argument is not iterable');
}

export default flat;
