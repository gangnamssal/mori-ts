import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableAsyncIterableType } from '../../types';

function syncAt<A>(index: number, iter: Iterable<A>): A | undefined {
  if (index === 0) {
    const iterator = iter[Symbol.iterator]();
    const result = iterator.next();
    return result.done ? undefined : result.value;
  }

  let count = 0;
  let cache: A[] | null = index < 0 ? [] : null;

  for (const item of iter) {
    if (index >= 0) {
      if (count === index) return item;
    } else {
      if (cache) {
        cache.push(item);
      }
    }
    count++;
  }

  if (index < 0 && cache) {
    const adjustedIndex = count + index;
    if (adjustedIndex >= 0 && adjustedIndex < count) {
      return cache[adjustedIndex];
    }
  }

  return undefined;
}

async function asyncAt<A>(index: number, iter: AsyncIterable<A>): Promise<A | undefined> {
  if (index === 0) {
    const iterator = iter[Symbol.asyncIterator]();
    const result = await iterator.next();
    return result.done ? undefined : result.value;
  }

  let count = 0;
  const negativeIndex = index < 0;
  let items: A[] = [];

  for await (const item of iter) {
    if (!negativeIndex) {
      if (count === index) return item;
    } else {
      items.push(item);
    }
    count++;
  }

  if (negativeIndex) {
    index = items.length + index;
    if (index < 0 || index >= items.length) return undefined;
    return items[index];
  }

  return undefined;
}

function at<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  index: number,
  iter: A,
): ReturnIterableAsyncIterableType<A> | undefined;

function at<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  index: number,
): (iter: A) => ReturnIterableAsyncIterableType<A> | undefined;

function at<A extends Iterable<unknown> | AsyncIterable<unknown>>(index: number, iter?: A) {
  if (!iter) return (iter: A): IterableInfer<A> => at(index, iter) as IterableInfer<A>;

  if (isIterable<IterableInfer<A>>(iter)) return syncAt(index, iter);
  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncAt(index, iter);

  return undefined;
}

export default at;
