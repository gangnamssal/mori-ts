export const isIterable = <T = unknown>(value: any): value is Iterable<T> => {
  return value !== null && typeof value?.[Symbol.iterator] === 'function';
};

export const isAsyncIterable = <T = unknown>(value: any): value is AsyncIterable<T> => {
  return value !== null && typeof value?.[Symbol.asyncIterator] === 'function';
};

export const isPromise = <A, R>(a: A, f: (args: Awaited<A>) => R): R | Promise<R> =>
  a instanceof Promise ? a.then(f) : f(a as Awaited<A>);

export const isPromiseLike = <T>(a: Promise<T> | T): a is Promise<T> => {
  if (a instanceof Promise) return true;

  if (
    a !== null &&
    typeof a === 'object' &&
    typeof (a as any).then === 'function' &&
    typeof (a as any).catch === 'function'
  ) {
    return true;
  }

  return false;
};
