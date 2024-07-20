import { IterableInfer, ReturnIterableType } from '../../types';
import { isAsyncIterable, isIterable } from '../../utils';
import reduce from '../reduce/reduce';

function syncJoin<A>(sep: string, iter: Iterable<A>): string {
  return (reduce((a, b) => `${a}${sep}${b}`, iter) || '') as string;
}

async function asyncJoin<A>(sep: string, iter: AsyncIterable<A>): Promise<string> {
  return ((await reduce((a, b) => `${a}${sep}${b}`, iter)) || '') as string;
}

function join<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  sep: string,
  iter: A,
): ReturnIterableType<A, string>;

function join<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  sep: string,
): (iter: A) => ReturnIterableType<A, string>;

function join<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  sep = ',',
  iter?: A,
): ReturnIterableType<A, string> | ((iter: A) => ReturnIterableType<A, string>) {
  if (!iter) return (iter: A) => join(sep, iter);

  if (isIterable<IterableInfer<A>>(iter)) return syncJoin(sep, iter) as ReturnIterableType<A, string>;
  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncJoin(sep, iter) as ReturnIterableType<A, string>;

  throw new Error('argument is not iterable');
}

export default join;
