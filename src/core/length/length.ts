import reduce from '../reduce/reduce';
import { ReturnIterableAsyncIterableType } from '../../types';

function length<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): ReturnIterableAsyncIterableType<A, number> {
  return reduce(acc => acc + 1, 0, iter);
}

export default length;
