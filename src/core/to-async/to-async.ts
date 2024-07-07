import { isPromiseLike } from '../../utils';

function toAsync<A>(iter: Iterable<A | Promise<A>>): AsyncIterableIterator<A> {
  const iterator = iter[Symbol.iterator]();

  return {
    async next() {
      const { value, done } = iterator.next();

      if (isPromiseLike(value)) return value.then(value => ({ done, value }));

      return { done, value };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

export default toAsync;
