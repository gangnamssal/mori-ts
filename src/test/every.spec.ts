import { toAsync, pipe, map, every } from '../core';

describe('every', () => {
  it('every with array', () => {
    const iter = [1, 2, 3];
    const res = every(x => x > 0, iter);

    expect(res).toBe(true);
  });

  it('every with async array', async () => {
    const iter = [1, 2, 3];
    const res = every(x => x > 0, toAsync(iter));

    expect(res).resolves.toBe(true);
  });

  it('every with pipe', () => {
    const iter = [1, 2, 3];

    const res = pipe(
      iter,
      map(x => x * 2),
      every(x => x > 0),
    );

    expect(res).toBe(true);
  });

  it('every with pipe 2', async () => {
    const iter = [1, 2, 3];

    const res = await pipe(
      iter,
      toAsync,
      map(x => x * 2),
      every(x => x > 0),
    );

    expect(res).toBe(true);
  });
});
