import { ReturnIterableAsyncIterableType } from '../../types';
import pipe from '../pipe/pipe';
import reduce from '../reduce/reduce';
import { isAsyncIterable, isIterable } from './../../utils';

function syncLength<A>(iter: Iterable<A>): number {
  return pipe(iter, iter => reduce(acc => acc + 1, 0, iter));
}

async function asyncLength<A>(iter: AsyncIterable<A>): Promise<number> {
  return pipe(iter, iter => reduce(acc => acc + 1, 0, iter));
}

function length<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): ReturnIterableAsyncIterableType<A, number> {
  if (isIterable(iter)) return syncLength(iter) as ReturnIterableAsyncIterableType<A, number>;

  if (isAsyncIterable(iter)) return asyncLength(iter) as ReturnIterableAsyncIterableType<A, number>;

  throw new Error('argument is not iterable or async iterable');
}

export default length;
