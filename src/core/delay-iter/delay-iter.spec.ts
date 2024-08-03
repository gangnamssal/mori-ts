import { map, pipe, toArray, toAsync } from '..';
import delayIter from './delay-iter';

describe('delayIter', () => {
  it('should delayIter sync iterable', async () => {
    const iter = delayIter(100, [1, 2, 3]);

    const start = Date.now();
    const first = await iter.next();
    const end = Date.now();

    expect(first).toEqual({ value: 1, done: false });

    expect(end - start).toBeGreaterThanOrEqual(100);
    expect(end - start).toBeLessThan(200);

    const second = await iter.next();

    expect(second).toEqual({ value: 2, done: false });

    const third = await iter.next();

    expect(third).toEqual({ value: 3, done: false });
  });

  it('should delayIter async iterable', async () => {
    const iter = delayIter(
      100,
      (async function* () {
        yield 1;
        yield 2;
        yield 3;
      })(),
    );

    const start = Date.now();
    const first = await iter.next();
    const end = Date.now();

    expect(first).toEqual({ value: 1, done: false });

    expect(end - start).toBeGreaterThanOrEqual(100);
    expect(end - start).toBeLessThan(200);

    const second = await iter.next();

    expect(second).toEqual({ value: 2, done: false });

    const third = await iter.next();

    expect(third).toEqual({ value: 3, done: false });
  });

  it('delayIter with pipe', async () => {
    const start = Date.now();

    const res = await pipe(
      [1, 2, 3],
      map(x => x + 1),
      delayIter(300),
      toArray,
    );

    const end = Date.now();

    expect(res).toEqual([2, 3, 4]);

    expect(end - start).toBeGreaterThanOrEqual(300);
    expect(end - start).toBeLessThan(400);
  });

  it('delayIter with pipe 2', async () => {
    const start = Date.now();

    const res = await pipe(
      [1, 2, 3, 4, 5],
      toAsync,
      map(x => x + 1),
      delayIter(500),
      toArray,
    );

    const end = Date.now();

    expect(res).toEqual([2, 3, 4, 5, 6]);

    expect(end - start).toBeGreaterThanOrEqual(500);
    expect(end - start).toBeLessThan(600);
  });
});
