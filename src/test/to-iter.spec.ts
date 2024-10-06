import { at, compact, find, map, pipe, range, some, toAsync, toIter, toValue } from '../core';

describe('toIter', () => {
  it('toIter with sync value', () => {
    const value = 1;
    const result = toIter(value);
    expect(result.next()).toEqual({ value, done: false });
  });

  it('toIter with sync value 2', () => {
    const value = { a: 1, b: 2 };
    const result = toIter(value);
    expect(result.next()).toEqual({ value, done: false });
    expect(result.next()).toEqual({ value: undefined, done: true });
    expect(result.next()).toEqual({ value: undefined, done: true });
  });

  it('toIter with async value', async () => {
    const value = Promise.resolve(1);
    const result = toIter(value);

    expect(result.next()).resolves.toEqual({ value: 1, done: false });
  });

  it('toIter with pipe', () => {
    const res = pipe(
      range(1, 10),
      map(x => x * 2),
      find(x => x === 16),
      toIter,
      compact,
      map(x => x + 1),
      toValue,
    );

    expect(res).toBe(17);

    const res2 = pipe(
      range(1, 10),
      map(x => x * 2),
      find(x => x === 100),
      toIter,
      compact,
      map(x => x + 1),
      toValue,
    );

    expect(res2).toBeUndefined();
  });

  it('toIter with pipe 2', async () => {
    const res = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      toAsync,
      map(x => x * 2),
      find(x => x === 6),
      toIter,
      compact,
      map(x => x + 1),
      toValue,
    );

    expect(res).resolves.toBe(7);

    const res2 = await pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      toAsync,
      map(x => x * 2),
      find(x => x === 16),
      toIter,
      compact,
      map(x => x + 1),
      toValue,
    );

    expect(res2).toBeUndefined();
  });

  it('toIter with pipe 3', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      toAsync,
      map(x => x * 2),
      find(x => x === 16),
      toIter,
      compact,
      map(x => x + 1),
      toValue,
    );

    expect(res).toBeUndefined();

    const res2 = await pipe(
      Promise.resolve([1, 2, 3]),
      toAsync,
      map(x => x * 2),
      find(x => x === 6),
      toIter,
      compact,
      map(x => x + 1),
      toValue,
    );

    expect(res2).toBe(7);
  });

  it('toIter with pipe 4', async () => {
    const res = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      toAsync,
      map(x => x * 2),
      at(-1),
      toIter,
      compact,
      map(x => x + 1),
      toValue,
    );

    expect(res).resolves.toBe(7);

    const res2 = await pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      toAsync,
      map(x => x * 2),
      at(-10),
      toIter,
      compact,
      map(x => x + 1),
      toValue,
    );

    expect(res2).toBeUndefined();
  });

  it('toIter with pipe 5', () => {
    const res = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      toAsync,
      map(x => x * 2),
      some(x => x > 10),
      toIter,
      map(x => !x),
      toValue,
    );

    expect(res).resolves.toBe(true);
  });
});
