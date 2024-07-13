import map from '../map/map';
import flat from '../flat/flat';
import pipe from '../pipe/pipe';
import { IterableInfer, ReturnIterableIteratorType } from '../../types';

function flatMap<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(fn: (args: IterableInfer<A>) => B, iter: A): ReturnIterableIteratorType<A, IterableInfer<B>>;

function flatMap<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(fn: (args: IterableInfer<A>) => B): (iter: A) => ReturnIterableIteratorType<A, IterableInfer<B>>;

function flatMap<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
):
  | ReturnIterableIteratorType<A, IterableInfer<B>>
  | ((iter: A) => ReturnIterableIteratorType<A, IterableInfer<B>>) {
  if (!iter)
    return (iter: A): ReturnIterableIteratorType<A, IterableInfer<B>> =>
      flatMap(fn, iter as any) as ReturnIterableIteratorType<A, IterableInfer<B>>;

  return pipe(iter, map(fn), flat) as ReturnIterableIteratorType<A, IterableInfer<B>>;
}

export default flatMap;
