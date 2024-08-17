import { ReturnIterableIteratorType } from './../../types';
import { isAsyncIterable, isIterable } from './../../utils';

function* syncReverse<A>(iter: Iterable<A>): IterableIterator<A> {
  const iteratorInstance = iter[Symbol.iterator]();
  let currentItem = iteratorInstance.next();

  const values: IteratorResult<A>[] = [];

  while (!currentItem.done) {
    values.unshift(currentItem);
    currentItem = iteratorInstance.next();
  }

  while (values.length > 0) {
    const { value, done } = values.shift() as IteratorResult<A>;

    if (done) return;

    yield value;
  }
}

async function* asyncReverse<A>(iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  const iteratorInstance = iter[Symbol.asyncIterator]();
  let currentItem = await iteratorInstance.next();

  const values: IteratorResult<A>[] = [];

  while (!currentItem.done) {
    values.unshift(currentItem);
    currentItem = await iteratorInstance.next();
  }

  while (values.length > 0) {
    const { value, done } = values.shift() as IteratorResult<A>;

    if (done) return;

    yield value;
  }
}

function reverse<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): ReturnIterableIteratorType<A> {
  if (isIterable(iter)) return syncReverse(iter) as ReturnIterableIteratorType<A>;

  if (isAsyncIterable(iter)) return asyncReverse(iter) as ReturnIterableIteratorType<A>;

  throw new Error('argument must be an iterable or async iterable');
}

export default reverse;
