import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterablePromiseType } from '../../types';

function* syncTake<T>(limit: number, iter: Iterable<T | Promise<T>>): IterableIterator<T | Promise<T>> {
  const iterator = iter[Symbol.iterator]();

  while (limit-- > 0) {
    const { value, done } = iterator.next();

    if (done) break;

    yield value instanceof Promise ? value.then(value => value) : value;
  }
}

async function* asyncTake<T>(limit: number, iter: AsyncIterable<T>): AsyncIterableIterator<T> {
  const iterator = iter[Symbol.asyncIterator]();

  while (limit-- > 0) {
    const { value, done } = await iterator.next();

    if (done) break;

    yield value;
  }
}

function take<T>(limit: number, iter: Iterable<T>): IterableIterator<T>;
function take<T>(limit: number, iter: Iterable<Promise<T>>): IterableIterator<Promise<T>>;
function take<T>(limit: number, iter: AsyncIterable<T>): AsyncIterableIterator<T>;
function take<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  limit: number,
): (iter: T) => ReturnIterablePromiseType<T>;

function take<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  limit: number,
  iter?: T,
):
  | IterableIterator<IterableInfer<T>>
  | AsyncIterableIterator<IterableInfer<T>>
  | ((iter: T) => ReturnIterablePromiseType<T>) {
  if (!iter)
    return (iter: T): ReturnIterablePromiseType<T> =>
      take(limit, iter as any) as ReturnIterablePromiseType<T>;

  if (isIterable<IterableInfer<T>>(iter)) return syncTake(limit, iter) as IterableIterator<IterableInfer<T>>;
  if (isAsyncIterable<IterableInfer<T>>(iter))
    return asyncTake(limit, iter) as AsyncIterableIterator<IterableInfer<T>>;

  throw new Error('take() expects an iterable or async iterable as input');
}

export default take;
