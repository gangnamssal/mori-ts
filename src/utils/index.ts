export const isIterable = <T = unknown>(value: any): value is Iterable<T> => {
  return typeof value?.[Symbol.iterator] === 'function';
};

export const isAsyncIterable = <T = unknown>(value: any): value is AsyncIterable<T> => {
  return typeof value?.[Symbol.asyncIterator] === 'function';
};

export const isIterableIterator = <T = unknown>(value: any): value is IterableIterator<T> => {
  return typeof value?.[Symbol.iterator] === 'function';
};

export const isAsyncIterableIterator = <T = unknown>(value: any): value is AsyncIterableIterator<T> => {
  return typeof value?.[Symbol.asyncIterator] === 'function';
};

export const noop = () => {};

export const nop = Symbol('nop');

export const isPromise = <A, R>(a: A, f: (args: Awaited<A>) => R): R | Promise<R> =>
  a instanceof Promise ? a.then(f) : f(a as Awaited<A>);
