import { delay, filter, map, pipe, range, toArray, toAsync, concurrent } from '../core';

describe('concurrent', () => {
  it('limit is valid num with map', async () => {
    const start = Date.now();

    const res = await pipe(
      range(0, 6),
      toAsync,
      map(x => delay(1000, x)),
      concurrent(4),
      toArray,
    );

    const end = Date.now();

    expect(res).toEqual([0, 1, 2, 3, 4, 5]);
    expect(end - start).toBeLessThan(3000);
  });

  it('limit is valid num with map 2', async () => {
    const start = Date.now();

    const res = await pipe(
      range(0, 6),
      toAsync,
      map(x => delay(1000, x * 2)),
      concurrent(3),
      toArray,
    );

    const end = Date.now();

    expect(res).toEqual([0, 2, 4, 6, 8, 10]);
    expect(end - start).toBeLessThan(4000);
  });

  it('limit is valid num with filter', async () => {
    const start = Date.now();

    const res = await pipe(
      range(0, 6),
      toAsync,
      filter(x => delay(1000, x % 2 === 0)),
      concurrent(4),
      toArray,
    );

    const end = Date.now();

    expect(res).toEqual([0, 2, 4]);
    expect(end - start).toBeLessThan(3000);
  }, 10000);

  it('concurrent with empty string', async () => {
    const res = await pipe('', toAsync, concurrent(4), toArray);
    expect(res).toEqual([]);
  });
});
