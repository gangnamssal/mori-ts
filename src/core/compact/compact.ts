import { ReturnIterableIteratorType } from '../../types';
import filter from '../filter/filter';

function compact<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): ReturnIterableIteratorType<A> {
  return filter(Boolean, iter);
}

export default compact;
