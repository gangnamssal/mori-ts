import { ReturnArrayType } from '../../types';
import { isAsyncIterable, isIterable } from './../../utils';

async function asyncToArray<A>(iter: AsyncIterable<A>): Promise<A[]> {
  const res: A[] = [];

  for await (const a of iter) {
    res.push(a);
  }

  return res;
}

function toArray<A extends Iterable<any> | AsyncIterable<any>>(iter: A): ReturnArrayType<A>;

function toArray<A extends Iterable<A> | AsyncIterable<A>>(iter: A) {
  if (isIterable(iter)) return Array.from(iter);

  if (isAsyncIterable(iter)) return asyncToArray(iter);

  return [];
}

export default toArray;
