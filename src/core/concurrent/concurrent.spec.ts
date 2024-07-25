import { delay, delayEach, each, map, pipe, toArray, toAsync } from '..';
import concurrent from './concurrent';

describe('concurrent', () => {
  it('test', async () => {
    const res = await pipe(
      [1, 2, 3, 4],
      toAsync,
      map(a => a),
      delayEach(1000),
      concurrent,
      each(console.log),
      toArray,
    );

    expect(res).toEqual([1, 2, 3, 4]);
  }, 10000);
});
