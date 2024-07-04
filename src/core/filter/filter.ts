import { IterableInfer, ReturnIterableIteratorType, isAsyncIterable, isIterable } from '../../utils';

function* syncFilter<A, B>(
  fn: (args: A) => B,
  iter: Iterable<A | Promise<A>>,
): IterableIterator<A | Promise<A | undefined>> {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { done, value } = iterator.next();

    if (done) break;

    if (value instanceof Promise) {
      yield value.then(v => {
        if (fn(v)) return v;
      });
    } else if (fn(value)) {
      yield value;
    }
  }
}

async function* asyncFilter<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { done, value } = await iterator.next();
    if (done) return;

    const result = await fn(value);

    if (result) yield value;
  }
}

function filter<A, B>(fn: (args: Awaited<A>) => B, iter: Iterable<A>): IterableIterator<A>;

function filter<A, B>(fn: (args: Awaited<A>) => B, iter: Iterable<Promise<A>>): IterableIterator<Promise<A>>;

function filter<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<A>;

function filter<A extends Iterable<any> | AsyncIterable<A>, B>(
  fn: (args: Awaited<IterableInfer<A>>) => B,
): (iter: A) => ReturnIterableIteratorType<A>;

function filter<A extends Iterable<any> | AsyncIterable<any>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
):
  | IterableIterator<A | Promise<A | undefined>>
  | AsyncIterableIterator<A>
  | ((iter: A) => ReturnIterableIteratorType<A>) {
  if (!iter)
    return (iter: A): ReturnIterableIteratorType<A> =>
      filter(fn, iter as any) as ReturnIterableIteratorType<A>;

  if (isAsyncIterable<IterableInfer<A>>(iter))
    return asyncFilter(fn, iter as AsyncIterable<IterableInfer<A>>);

  if (isIterable<IterableInfer<A>>(iter)) return syncFilter(fn, iter);

  throw new Error('Must be an iterable or async iterable');
}

export default filter;
