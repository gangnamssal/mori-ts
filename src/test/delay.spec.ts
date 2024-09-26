import { map, pipe, toArray, toAsync, delay } from '../core';

describe('delay', () => {
  it('delay with number', async () => {
    const result = await delay(1000, 1);

    expect(result).toBe(1);
  });

  it('delay with undefined', async () => {
    const result = await delay(1000);

    expect(result).toBeUndefined();
  });

  it('delay with pipe', async () => {
    const start = Date.now();

    const res = await pipe(
      [1, 2, 3],
      toAsync,
      map(value => delay(1000, value)),
      toArray,
    );

    const end = Date.now();

    expect(res).toEqual([1, 2, 3]);
    expect(end - start).toBeGreaterThanOrEqual(3000);
    expect(end - start).toBeLessThan(4000);
  });
});
