export type IsPromise<T, R> =
  T extends Promise<unknown> ? Promise<Awaited<R>> : Promise<unknown> extends T ? Promise<Awaited<R>> | R : R;

export type IterableInfer<T extends Iterable<unknown> | AsyncIterable<unknown>> = T extends
  | Iterable<infer U>
  | AsyncIterable<infer U>
  ? U
  : never;

export type IterableRecurInfer<T extends Iterable<unknown> | AsyncIterable<unknown>> = T extends string
  ? T
  : T extends Iterable<infer U> | AsyncIterable<infer U>
    ? U extends Iterable<unknown> | AsyncIterable<unknown>
      ? IterableRecurInfer<U>
      : U
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

export type ReturnArrayType<T extends Iterable<unknown> | AsyncIterable<unknown>, R = IterableInfer<T>> =
  T extends Iterable<unknown> ? R[] : T extends AsyncIterable<unknown> ? Promise<R[]> : never;

export type ReturnIterableAsyncIterableType<
  T extends Iterable<unknown> | AsyncIterable<unknown>,
  R = IterableInfer<T>,
> = T extends Iterable<unknown> ? R : T extends AsyncIterable<unknown> ? Promise<R> : never;

export type ReturnIterablePromiseType<T extends Iterable<unknown> | AsyncIterable<unknown>> =
  T extends Iterable<unknown>
    ? IterableIterator<IterableInfer<T>>
    : T extends AsyncIterable<unknown>
      ? AsyncIterableIterator<IterableInfer<T>>
      : never;

export type ReturnConvertedIterableType<A> =
  A extends Iterable<unknown>
    ? IterableIterator<IterableInfer<A>>
    : A extends AsyncIterable<unknown>
      ? AsyncIterableIterator<Awaited<IterableInfer<A>>>
      : A extends Promise<unknown>
        ? AsyncIterableIterator<Awaited<A>>
        : IterableIterator<A>;

export type IsNever<T> = [T] extends [never] ? true : false;

export type ResolveType<A> = (value: IteratorResult<A> | PromiseLike<IteratorResult<A>>) => void;

export type RejectType = (reason?: any) => void;

export type PickPositiveType<T> = Exclude<T, 0 | null | undefined | false | ''>;
