import { map, pipe, toAsync, find } from '../core';

describe('find', () => {
  it('should return the first element that satisfies the predicate', () => {
    const result = find(x => x > 2, [1, 2, 3, 4, 5]);

    expect(result).toBe(3);
  });

  it('should return the first element that satisfies the predicate in async iterables', async () => {
    const result = find(
      (x: number) => x > 2,
      (async function* () {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
      })(),
    );

    expect(result).resolves.toBe(3);
  });

  it('should return undefined if no element satisfies the predicate', () => {
    const result = find((x: number) => x > 5, [1, 2, 3, 4, 5]);

    expect(result).toBeUndefined();
  });

  it('should return undefined if no element satisfies the predicate in async iterables', async () => {
    const result = find(
      (x: number) => x > 5,
      (async function* () {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
      })(),
    );

    expect(result).resolves.toBeUndefined();
  });

  it('should return undefined for empty iterables', () => {
    const result = find((x: number) => x > 2, []);

    expect(result).toBeUndefined();
  });

  it('should return undefined for empty async iterables', async () => {
    const result = find((x: number) => x > 2, (async function* () {})());

    expect(result).resolves.toBeUndefined();
  });

  it('find with pipe', () => {
    const iter = [1, 2, 3, 4, 5];

    const res = pipe(
      iter,
      map((x: number) => x * 2),
      find((x: number) => x > 5),
    );

    expect(res).toEqual(6);
  });

  it('find with pipe 2', () => {
    const iter = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
      Promise.resolve(5),
    ];

    const res = pipe(
      iter,
      toAsync,
      map((x: number) => x * 2),
      find((x: number) => x > 5),
    );

    expect(res).resolves.toEqual(6);
  });

  it('find with pipe 3', () => {
    const iter = Promise.resolve([1, 2, 3, 4, 5]);

    const res = pipe(
      iter,
      map((x: number) => x * 2),
      find((x: number) => x > 5),
    );

    expect(res).resolves.toEqual(6);
  });

  it('find with string', () => {
    const iter = 'hello';
    const res = find((x: string) => x === 'l', iter);

    expect(res).toBe('l');
  });

  it('find with empty string', () => {
    const iter = '';
    const res = find((x: string) => x === 'l', iter);

    expect(res).toBeUndefined();
  });
});
