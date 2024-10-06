import { reverse, toArray, toAsync, pipe, map, range, delay, concurrent, filter } from '../core';

describe('reverse', () => {
  it('should reverse an iterable', () => {
    const iter = [1, 2, 3, 4];
    const result = reverse(iter);

    expect([...result]).toEqual([4, 3, 2, 1]);
  });

  it('should reverse an async iterable', async () => {
    const iter = async function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
    };

    const result = reverse(iter());

    expect(await result.next()).toEqual({ value: 4, done: false });
    expect(await result.next()).toEqual({ value: 3, done: false });
    expect(await result.next()).toEqual({ value: 2, done: false });
    expect(await result.next()).toEqual({ value: 1, done: false });
    expect(await result.next()).toEqual({ value: undefined, done: true });
  });

  it('reverse with string', () => {
    const iter = '1234';
    const result = reverse(iter);

    expect([...result]).toEqual(['4', '3', '2', '1']);
  });

  it('reverse with Map', () => {
    const iter = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
      ['d', 4],
    ]);
    const result = reverse(iter);

    expect([...result]).toEqual([
      ['d', 4],
      ['c', 3],
      ['b', 2],
      ['a', 1],
    ]);
  });

  it('reverse with Set', () => {
    const iter = new Set([1, 2, 3, 4]);
    const result = reverse(iter);

    expect([...result]).toEqual([4, 3, 2, 1]);
  });

  it('reverse with toArray', () => {
    const iter = [1, 2, 3, 4];
    const result = toArray(reverse(iter));

    expect(result).toEqual([4, 3, 2, 1]);
  });

  it('reverse with toAsync', () => {
    const iter = toAsync([1, 2, 3, 4]);

    const result = reverse(iter);

    expect(result.next()).resolves.toEqual({ value: 4, done: false });
    expect(result.next()).resolves.toEqual({ value: 3, done: false });
    expect(result.next()).resolves.toEqual({ value: 2, done: false });
    expect(result.next()).resolves.toEqual({ value: 1, done: false });
    expect(result.next()).resolves.toEqual({ value: undefined, done: true });
  });

  it('reverse with pipe', () => {
    const iter = [1, 2, 3, 4];

    const result = pipe(iter, reverse, toArray);

    expect(result).toEqual([4, 3, 2, 1]);
  });

  it('reverse with pipe 2', async () => {
    const iter = [1, 2, 3, 4];

    const result = pipe(iter, toAsync, reverse, toArray);
    expect(result).resolves.toEqual([4, 3, 2, 1]);

    const result2 = await pipe(iter, toAsync, reverse, toArray);
    expect(result2).toEqual([4, 3, 2, 1]);
  });

  it('reverse with pipe 3', () => {
    const iter = [1, 2, 3, 4];

    const result = pipe(
      iter,
      map(a => a * 2),
      reverse,
      toArray,
    );

    expect(result).toEqual([8, 6, 4, 2]);
  });

  it('reverse with pipe 4', async () => {
    const start = Date.now();

    const result = await pipe(
      range(1, 5),
      toAsync,
      map(a => delay(1000, a * 2)),
      concurrent(2),
      reverse,
      toArray,
    );

    const end = Date.now();

    expect(result).toEqual([8, 6, 4, 2]);
    expect(end - start).toBeLessThan(2500);
  });

  it('reverse with pipe 5', async () => {
    const start = Date.now();

    const result = await pipe(
      range(1, 5),
      toAsync,
      filter(a => delay(1000, a % 2 === 0)),
      concurrent(2),
      reverse,
      toArray,
    );

    const end = Date.now();

    expect(result).toEqual([4, 2]);
    expect(end - start).toBeLessThan(2500);
  });

  it('reverse with empty string', () => {
    const iter = '';
    const result = reverse(iter);

    expect([...result]).toEqual([]);
  });

  it('reverse with empty array', () => {
    const iter: number[] = [];
    const result = reverse(iter);

    expect([...result]).toEqual([]);
  });
});
