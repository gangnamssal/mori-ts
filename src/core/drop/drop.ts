import { IterableInfer, ReturnIterableIteratorType } from '../../types';
import { isAsyncIterable, isIterable } from './../../utils';

function* syncDrop<A>(skip: number, iter: Iterable<A>): IterableIterator<A> {
  if (skip <= 0) return yield* iter;

  let count = 0;

  for (const value of iter) {
    if (count++ < skip) continue;
    yield value;
  }
}

async function* asyncDrop<A>(skip: number, iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  if (skip <= 0) return yield* iter;

  let count = 0;

  for await (const value of iter) {
    if (count++ < skip) continue;
    yield value;
  }
}

function drop<A>(skip: number, iter: Iterable<A>): IterableIterator<A>;
function drop<A>(skip: number, iter: AsyncIterable<A>): AsyncIterableIterator<A>;
function drop<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  skip: number,
): (iter: A) => ReturnIterableIteratorType<A>;

function drop<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  skip: number,
  iter?: A,
):
  | IterableIterator<IterableInfer<A>>
  | AsyncIterableIterator<IterableInfer<A>>
  | ((iter: A) => ReturnIterableIteratorType<A>) {
  if (!iter && typeof iter === 'string') return syncDrop(skip, iter);

  if (!iter)
    return (iter: A): ReturnIterableIteratorType<A> =>
      drop(skip, iter as any) as ReturnIterableIteratorType<A>;

  if (isIterable(iter)) return syncDrop(skip, iter) as IterableIterator<IterableInfer<A>>;
  if (isAsyncIterable(iter)) return asyncDrop(skip, iter) as AsyncIterableIterator<IterableInfer<A>>;

  throw new Error('Invalid arguments');
}

export default drop;
