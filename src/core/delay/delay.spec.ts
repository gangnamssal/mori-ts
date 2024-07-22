import { map, pipe, toArray, toAsync } from '..';
import delay from './delay';

describe('delay', () => {
  it('should delay sync iterable', async () => {
    const iter = delay(100, [1, 2, 3]);

    const start = Date.now();
    const first = await iter.next();
    const end = Date.now();

    expect(first).toEqual({ value: 1, done: false });

    expect(end - start).toBeGreaterThan(100);
    expect(end - start).toBeLessThan(200);

    const second = await iter.next();

    expect(second).toEqual({ value: 2, done: false });

    const third = await iter.next();

    expect(third).toEqual({ value: 3, done: false });
  });

  it('should delay async iterable', async () => {
    const iter = delay(
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

    expect(end - start).toBeGreaterThan(100);
    expect(end - start).toBeLessThan(200);

    const second = await iter.next();

    expect(second).toEqual({ value: 2, done: false });

    const third = await iter.next();

    expect(third).toEqual({ value: 3, done: false });
  });

  it('delay with pipe', async () => {
    const start = Date.now();

    const res = await pipe(
      [1, 2, 3],
      delay(100),
      map(x => x + 1),
      toArray,
    );

    const end = Date.now();

    expect(res).toEqual([2, 3, 4]);

    expect(end - start).toBeGreaterThan(300);
    expect(end - start).toBeLessThan(400);
  });

  it('delay with pipe 2', async () => {
    const start = Date.now();

    const res = await pipe(
      [1, 2, 3, 4, 5],
      toAsync,
      map(x => x + 1),
      delay(100),
      toArray,
    );

    const end = Date.now();

    expect(res).toEqual([2, 3, 4, 5, 6]);

    expect(end - start).toBeGreaterThan(500);
    expect(end - start).toBeLessThan(600);
  });
});
