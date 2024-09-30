import { isAsyncIterable, isIterable } from './../../utils';
import { ReturnIterableIteratorType } from './../../types';

function* syncSlice<A>(start: number, end: number | Iterable<A>, iter?: Iterable<A>): IterableIterator<A> {
  let count = 0;
  let iterator;

  if (typeof end !== 'number') {
    iterator = end[Symbol.iterator]();
    end = Infinity;
  } else if (iter !== undefined) {
    iterator = iter[Symbol.iterator]();
  }

  while (count < end && start < end) {
    const { value, done } = (iterator as Iterator<A>).next();

    if (done) break;

    if (count >= start) yield value;

    count++;
  }
}

async function* asyncSlice<A>(
  start: number,
  end: number | AsyncIterable<A>,
  iter?: AsyncIterable<A>,
): AsyncIterableIterator<A> {
  let count = 0;
  let iterator;

  if (typeof end !== 'number') {
    iterator = end[Symbol.asyncIterator]();
    end = Infinity;
  } else if (iter !== undefined) {
    iterator = iter[Symbol.asyncIterator]();
  }

  while (count < end && start < end) {
    const { value, done } = await (iterator as AsyncIterator<A>).next();

    if (done) break;

    if (count >= start) yield value;

    count++;
  }
}

function slice<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
  end: number,
  iter: A,
): ReturnIterableIteratorType<A>;

function slice<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
  end: A,
): ReturnIterableIteratorType<A>;

function slice<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
  end: number,
): (iter: A) => ReturnIterableIteratorType<A>;

function slice<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
): (iter: A) => ReturnIterableIteratorType<A>;

function slice<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
  end?: number | A,
  iter?: A,
): ReturnIterableIteratorType<A> | ((iter: A) => ReturnIterableIteratorType<A>) {
  if (iter === undefined && typeof end === 'number')
    return (iter: A): ReturnIterableIteratorType<A> =>
      slice(start, end, iter) as ReturnIterableIteratorType<A>;

  if (iter === undefined && end === undefined)
    return (iter: A): ReturnIterableIteratorType<A> => slice(start, iter) as ReturnIterableIteratorType<A>;

  if (isIterable<A>(iter) && typeof end === 'number')
    return syncSlice(start, end, iter) as ReturnIterableIteratorType<A>;

  if (isIterable<A>(end)) return syncSlice(start, end) as ReturnIterableIteratorType<A>;

  if (isAsyncIterable<A>(iter) && typeof end === 'number')
    return asyncSlice(start, end, iter) as ReturnIterableIteratorType<A>;

  if (isAsyncIterable<A>(end)) return asyncSlice(start, end) as ReturnIterableIteratorType<A>;

  throw new Error('arguments is not valid.');
}

export default slice;
