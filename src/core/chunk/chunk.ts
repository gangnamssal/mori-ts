import { IsNever, IterableInfer, ReturnIterableIteratorType } from '../../types';
import { isAsyncIterable, isIterable } from '../../utils';
import take from '../take/take';
import toArray from '../to-array/to-array';

function* syncChunk<A>(size: number, iter: Iterable<A>): IterableIterator<A[]> {
  if (size <= 0) return;

  const iterator = iter[Symbol.iterator]();

  while (true) {
    const arr = toArray(
      take(size, {
        [Symbol.iterator]() {
          return iterator;
        },
      }),
    );

    if (arr.length) yield arr;
    if (arr.length < size) break;
  }
}

async function* asyncChunk<A>(size: number, iter: AsyncIterable<A>): AsyncIterableIterator<A[]> {
  if (size <= 0) return;

  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const arr = await toArray(
      take(size, {
        [Symbol.asyncIterator]() {
          return iterator;
        },
      }),
    );

    if (arr.length) yield arr;
    if (arr.length < size) break;
  }
}

function chunk<A>(
  size: number,
  iter: Iterable<A>,
): IsNever<A> extends true ? IterableIterator<never> : IterableIterator<A[]>;
function chunk<A>(size: number, iter: AsyncIterable<A>): AsyncIterableIterator<A[]>;
function chunk<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  size: number,
): (
  iter: A,
) => ReturnIterableIteratorType<A, IsNever<IterableInfer<A>> extends true ? never : IterableInfer<A>[]>;

function chunk<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  size: number,
  iter?: A,
):
  | IterableIterator<IterableInfer<A>[]>
  | AsyncIterableIterator<IterableInfer<A>[]>
  | ((
      iter: A,
    ) => ReturnIterableIteratorType<A, IsNever<IterableInfer<A>> extends true ? never : IterableInfer<A>[]>) {
  if (!iter) return (iter: A) => chunk(size, iter as any) as any;

  if (isIterable(iter)) return syncChunk(size, iter) as IterableIterator<IterableInfer<A>[]>;
  if (isAsyncIterable(iter)) return asyncChunk(size, iter) as AsyncIterableIterator<IterableInfer<A>[]>;

  throw new Error('argument is not iterable');
}

export default chunk;
