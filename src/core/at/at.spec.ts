import at from './at';
import { filter, map, pipe } from '..';

describe('at', () => {
  it('should return the element at the specified index', () => {
    const res = at(0, [1, 2, 3]);
    const res2 = at(1, [1, 2, 3]);
    const res3 = at(2, [1, 2, 3]);

    expect(res).toBe(1);
    expect(res2).toBe(2);
    expect(res3).toBe(3);
  });

  it('should return the element at the specified index from the end', () => {
    const res = at(-1, [1, 2, 3]);
    const res2 = at(-2, [1, 2, 3]);
    const res3 = at(-3, [1, 2, 3]);
    const res4 = at(-5, [1, 2, 3]);

    expect(res).toBe(3);
    expect(res2).toBe(2);
    expect(res3).toBe(1);
    expect(res4).toBeUndefined();
  });

  it('should return undefined if the index is out of bounds', () => {
    const res = at(3, [1, 2, 3]);
    const res2 = at(4, [1, 2, 3]);

    expect(res).toBeUndefined();
    expect(res2).toBeUndefined();
  });

  it('should return undefined if the index is out of bounds from the end', () => {
    const res = at(-4, [1, 2, 3]);
    const res2 = at(-5, [1, 2, 3]);

    expect(res).toBeUndefined();
    expect(res2).toBeUndefined();
  });

  it('should return the element at the specified index in an async iterable', async () => {
    const res = await at(
      0,
      (async function* () {
        yield* [1, 2, 3];
      })(),
    );
    const res2 = await at(
      1,
      (async function* () {
        yield* [1, 2, 3];
      })(),
    );
    const res3 = await at(
      2,
      (async function* () {
        yield* [1, 2, 3];
      })(),
    );

    expect(res).toBe(1);
    expect(res2).toBe(2);
    expect(res3).toBe(3);
  });

  it('should return the element at the specified index from the end in an async iterable', async () => {
    const res = await at(
      -1,
      (async function* () {
        yield* [1, 2, 3];
      })(),
    );
    const res2 = await at(
      -2,
      (async function* () {
        yield* [1, 2, 3];
      })(),
    );
    const res3 = await at(
      -3,
      (async function* () {
        yield* [1, 2, 3];
      })(),
    );

    expect(res).toBe(3);
    expect(res2).toBe(2);
    expect(res3).toBe(1);
  });

  it('at with promise', async () => {
    const res = at(0, await Promise.resolve([1, 2, 3]));
    const res2 = at(1, [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
    const res3 = at(-1, [Promise.resolve(1), Promise.resolve(2), 3]);

    expect(res).toBe(1);
    expect(res2).resolves.toBe(2);
    expect(res3).toBe(3);
  });

  it('at with pipe', async () => {
    const res = pipe(
      [1, 2, 3],
      map(x => x * 2),
      filter(x => x > 2),
      at(0),
    );

    const res2 = pipe(
      [1, 2, 3],
      map(x => x * 2),
      filter(x => x > 2),
      at(-1),
    );

    const res3 = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      map(x => x * 2),
      at(-1),
    );

    const res4 = pipe(
      [Promise.resolve(1), 2, Promise.resolve(3)],
      map(x => x * 2),
      at(-2),
    );

    const res5 = await pipe(
      Promise.resolve([1, 2, 3]),
      map(x => x * 2),
      at(-2),
    );

    expect(res).toBe(4);
    expect(res2).toBe(6);
    expect(res3).resolves.toBe(6);
    expect(res4).toBe(4);
    expect(res5).toBe(4);
  });
});