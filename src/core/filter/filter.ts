import { isAsyncIterable, isIterable, nop } from '../../utils';

function* syncFilter<T, B>(
  fn: (args: T | Promise<T>) => B,
  iter: Iterable<T | Promise<T>>,
): IterableIterator<T | Promise<T>> {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { done, value } = iterator.next();

    if (done) break;

    if (fn(value)) yield value;
  }
}

async function* asyncFilter<T, R>(fn: (args: T) => R, iter: AsyncIterable<T>): AsyncIterableIterator<T> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { done, value } = await iterator.next();
    if (done) return;

    const result = await fn(value);

    if (result) yield value;
  }
}

function filter<T, B>(fn: (args: T) => B, iter: Iterable<T>): IterableIterator<T>;

function filter<T, B>(fn: (args: Promise<T>) => B, iter: Iterable<Promise<T>>): IterableIterator<Promise<T>>;

function filter<T, B>(fn: (args: T) => B, iter: AsyncIterable<T>): AsyncIterableIterator<T>;

function filter<T, B>(fn: (args: T) => B): (iter: Iterable<T>) => IterableIterator<T>;

function filter<T, B>(
  fn: (args: Promise<T>) => B,
): (iter: Iterable<Promise<T>>) => IterableIterator<Promise<T>>;

function filter<T, B>(fn: (args: T) => B): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>;

function filter<T, B>(
  fn: (args: T | Promise<T>) => B,
  iter?: Iterable<T | Promise<T>> | AsyncIterable<T>,
):
  | IterableIterator<T | Promise<T>>
  | AsyncIterableIterator<T>
  | ((iter: Iterable<T | Promise<T>>) => IterableIterator<T | Promise<T>>)
  | ((iter: AsyncIterable<T>) => AsyncIterableIterator<T>) {
  if (!iter) return (iter: Iterable<T | Promise<T>> | AsyncIterable<T>) => filter(fn, iter as any);

  if (isAsyncIterable(iter)) return asyncFilter(fn, iter as AsyncIterable<T>);

  if (isIterable(iter)) return syncFilter(fn, iter as Iterable<T | Promise<T>>);

  throw new Error('Must be an iterable or async iterable');
}

export default filter;
