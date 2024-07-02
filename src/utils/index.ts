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

export type IsPromise<T, R> =
  T extends Promise<any> ? Promise<R> : Promise<any> extends T ? Promise<R> | R : R;

export type IterableInfer<T extends Iterable<unknown> | AsyncIterable<unknown>> = T extends
  | Iterable<infer U>
  | AsyncIterable<infer U>
  ? U
  : never;

export type ReturnIterableIteratorType<
  T extends Iterable<unknown> | AsyncIterable<unknown>,
  R = IterableInfer<T>,
> =
  T extends Iterable<unknown>
    ? IterableIterator<R>
    : T extends AsyncIterable<unknown>
      ? AsyncIterableIterator<Awaited<R>>
      : never;

export const noop = () => {};

export const nop = Symbol('nop');

export const isPromise = <A, R>(a: A, f: (args: Awaited<A>) => R): R | Promise<R> =>
  a instanceof Promise ? a.then(f) : f(a as Awaited<A>);
