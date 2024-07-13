import { IsNever, IterableInfer } from '../../types';
import { isAsyncIterable, isIterable } from './../../utils';

function* syncZip<A, B>(iter1: Iterable<A>, iter2: Iterable<B>): IterableIterator<[A, B]> {
  const iterator1 = iter1[Symbol.iterator]();
  const iterator2 = iter2[Symbol.iterator]();

  while (true) {
    const { value: value1, done: done1 } = iterator1.next();
    const { value: value2, done: done2 } = iterator2.next();

    if (done1 || done2) break;

    yield [value1, value2];
  }
}

async function* asyncZip<A, B>(
  iter1: AsyncIterable<A>,
  iter2: AsyncIterable<B>,
): AsyncIterableIterator<[A, B]> {
  const iterator1 = iter1[Symbol.asyncIterator]();
  const iterator2 = iter2[Symbol.asyncIterator]();

  while (true) {
    const { value: value1, done: done1 } = await iterator1.next();
    const { value: value2, done: done2 } = await iterator2.next();

    if (done1 || done2) break;

    yield [value1, value2];
  }
}

async function* asyncSyncZip<A, B>(
  iter1: Iterable<A> | AsyncIterable<A>,
  iter2: Iterable<B> | AsyncIterable<B>,
): AsyncIterableIterator<[A, B]> {
  if (isIterable(iter1) && isAsyncIterable(iter2)) {
    const iterator1 = iter1[Symbol.iterator]();
    const iterator2 = iter2[Symbol.asyncIterator]();

    while (true) {
      const { value: value1, done: done1 } = iterator1.next();
      const { value: value2, done: done2 } = await iterator2.next();

      if (done1 || done2) break;

      yield [value1, value2];
    }
  } else if (isAsyncIterable(iter1) && isIterable(iter2)) {
    const iterator1 = iter1[Symbol.asyncIterator]();
    const iterator2 = iter2[Symbol.iterator]();

    while (true) {
      const { value: value1, done: done1 } = await iterator1.next();
      const { value: value2, done: done2 } = iterator2.next();

      if (done1 || done2) break;

      yield [value1, value2];
    }
  }
}

type ZipIterableIterator<A, B> = IterableIterator<true extends IsNever<A> | IsNever<B> ? never : [A, B]>;

type ZipAsyncIterableIterator<A, B> = AsyncIterableIterator<
  true extends IsNever<A> | IsNever<B> ? never : [A, B]
>;

function zip<A, B>(iter1: Iterable<A>, iter2: Iterable<B>): ZipIterableIterator<A, B>;

function zip<A, B>(iter1: AsyncIterable<A>, iter2: AsyncIterable<B>): ZipAsyncIterableIterator<A, B>;

function zip<A, B>(iter1: Iterable<A>, iter2: AsyncIterable<B>): ZipAsyncIterableIterator<A, B>;

function zip<A, B>(iter1: AsyncIterable<A>, iter2: Iterable<B>): ZipAsyncIterableIterator<A, B>;

function zip<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A,
): (
  iter2: B,
) => A extends AsyncIterable<unknown>
  ? ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>
  : B extends AsyncIterable<unknown>
    ? ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>
    : ZipIterableIterator<IterableInfer<A>, IterableInfer<B>>;

function zip<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iter1: A,
  iter2?: B,
):
  | ZipIterableIterator<IterableInfer<A>, IterableInfer<B>>
  | ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>
  | ((
      iter: B,
    ) =>
      | ZipIterableIterator<IterableInfer<A>, IterableInfer<B>>
      | ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>) {
  if (!iter2)
    return (
      iter2: B,
    ):
      | ZipIterableIterator<IterableInfer<A>, IterableInfer<B>>
      | ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>> =>
      zip(iter1 as any, iter2 as any) as
        | ZipIterableIterator<IterableInfer<A>, IterableInfer<B>>
        | ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>;

  if (isIterable(iter1) && isIterable(iter2))
    return syncZip(iter1, iter2) as ZipIterableIterator<IterableInfer<A>, IterableInfer<B>>;

  if (isAsyncIterable(iter1) && isAsyncIterable(iter2))
    return asyncZip(iter1, iter2) as ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>;

  if ((isAsyncIterable(iter1) && isIterable(iter2)) || (isIterable(iter1) && isAsyncIterable(iter2)))
    return asyncSyncZip(iter1, iter2) as ZipAsyncIterableIterator<IterableInfer<A>, IterableInfer<B>>;

  throw new Error('Invalid arguments');
}

export default zip;
