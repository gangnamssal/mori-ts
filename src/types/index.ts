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
