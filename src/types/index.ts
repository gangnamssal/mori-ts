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

export type ReturnArrayType<T extends Iterable<unknown> | AsyncIterable<unknown>> =
  T extends Iterable<unknown>
    ? IterableInfer<T>[]
    : T extends AsyncIterable<unknown>
      ? Promise<IterableInfer<T>[]>
      : never;

export type ReturnIterableAsyncIterableType<T extends Iterable<unknown> | AsyncIterable<unknown>> =
  T extends Iterable<unknown>
    ? IterableInfer<T>
    : T extends AsyncIterable<unknown>
      ? Promise<IterableInfer<T>>
      : never;

export type ReturnIterablePromiseType<T extends Iterable<unknown> | AsyncIterable<unknown>> =
  T extends Iterable<unknown>
    ? IterableIterator<IterableInfer<T>>
    : T extends AsyncIterable<unknown>
      ? AsyncIterableIterator<IterableInfer<T>>
      : never;
