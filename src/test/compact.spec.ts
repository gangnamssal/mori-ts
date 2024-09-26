import { toArray, pipe, range, map, toAsync, compact, delay, concurrent } from '../core';

describe('compact', () => {
  it('should remove falsy values from an iterable', () => {
    const iterable = [1, 2, 3, 4, 5, 0, null, undefined, false, ''];

    const result = compact(iterable);

    expect([...result]).toEqual([1, 2, 3, 4, 5]);
  });

  it('should remove falsy values from an async iterable', async () => {
    const asyncIterable = (async function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
      yield 0;
      yield null;
      yield undefined;
      yield false;
      yield '';
    })();
    const result = await toArray(compact(asyncIterable));

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should remove falsy values from an empty iterable', () => {
    const iterable: any[] = [];
    const result = compact(iterable);

    expect([...result]).toEqual([]);
  });

  it('should remove falsy values from a string iterable', () => {
    const str = 'Hello, Mori!';
    const result = compact(str);

    expect([...result]).toEqual(['H', 'e', 'l', 'l', 'o', ',', ' ', 'M', 'o', 'r', 'i', '!']);
  });

  it('should remove falsy values from an empty async iterable', async () => {
    const asyncIterable = (async function* () {})();
    const result = await toArray(compact(asyncIterable));

    expect(result).toEqual([]);
  });

  it('should remove falsy values from a pipe', () => {
    const res = pipe(
      range(1, 10),
      map(n => (n % 2 === 0 ? 0 : n)),
      compact,
      toArray,
    );

    expect(res).toEqual([1, 3, 5, 7, 9]);
  });

  it('should remove falsy values from a pipe 2', () => {
    const res = pipe(
      range(1, 10),
      toAsync,
      map(n => (n % 2 === 0 ? 0 : n)),
      compact,
      toArray,
    );

    expect(res).resolves.toEqual([1, 3, 5, 7, 9]);
  });

  it('should remove falsy values from a pipe 3', async () => {
    const start = Date.now();

    const res = await pipe(
      range(1, 10),
      toAsync,
      map(n => delay(500, n % 2 === 0 ? 0 : n)),
      compact,
      concurrent(3),
      toArray,
    );

    const end = Date.now();

    expect(res).toEqual([1, 3, 5, 7, 9]);
    expect(end - start).toBeLessThan(2000);
  });
});
