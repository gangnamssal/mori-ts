import { toArray } from '../core';

describe('toArray', () => {
  it('should convert an iterable to an array', () => {
    const iter = [1, 2, 3];
    const res = toArray(iter);

    expect(res).toEqual([1, 2, 3]);
  });

  it('should convert an async iterable to an array', async () => {
    const iter = (async function* () {
      yield 1;
      yield 2;
      yield 3;
    })();

    const res = await toArray(iter);

    expect(res).toEqual([1, 2, 3]);
  });
});
