import map from '../map/map';
import flat from '../flat/flat';
import pipe from '../pipe/pipe';
import { IterableInfer, ReturnIterableIteratorType, IterableRecurInfer } from '../../types';

function flatMap<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(fn: (args: IterableInfer<A>) => B, iter: A): ReturnIterableIteratorType<A, IterableRecurInfer<B>>;

function flatMap<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(fn: (args: IterableInfer<A>) => B): (iter: A) => ReturnIterableIteratorType<A, IterableRecurInfer<B>>;

function flatMap<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
):
  | ReturnIterableIteratorType<A, IterableRecurInfer<B>>
  | ((iter: A) => ReturnIterableIteratorType<A, IterableRecurInfer<B>>) {
  if (!iter)
    return (iter: A): ReturnIterableIteratorType<A, IterableRecurInfer<B>> =>
      flatMap(fn, iter as any) as ReturnIterableIteratorType<A, IterableRecurInfer<B>>;

  return pipe(iter, map(fn), flat) as ReturnIterableIteratorType<A, IterableRecurInfer<B>>;
}

export default flatMap;
