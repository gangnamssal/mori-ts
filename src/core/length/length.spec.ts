import pipe from '../pipe/pipe';
import range from '../range/range';
import length from './length';
import filter from '../filter/filter';
import delay from '../delay/delay';
import toAsync from '../to-async/to-async';
import map from '../map/map';
import concurrent from '../concurrent/concurrent';

describe('length', () => {
  it('should return the length of an iterable', () => {
    const iterable = [1, 2, 3, 4, 5];
    const result = length(iterable);

    expect(result).toBe(5);
  });

  it('should return the length of an async iterable', async () => {
    const asyncIterable = (async function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })();

    const result = await length(asyncIterable);

    expect(result).toBe(5);
  });

  it('length with an empty iterable should return 0', () => {
    const iterable: any[] = [];
    const result = length(iterable);

    expect(result).toBe(0);
  });

  it('length with an string iterable should return the length of the string', () => {
    const str = 'Hello, Mori!';
    const result = length(str);

    expect(result).toBe(12);
  });

  it('length with an empty async iterable should return 0', async () => {
    const asyncIterable = (async function* () {})();
    const result = await length(asyncIterable);

    expect(result).toBe(0);
  });

  it('length with pipe', () => {
    const res = pipe(range(1, 10), length);

    expect(res).toBe(9);
  });

  it('length with pipe 2', () => {
    const res = pipe(range(1, 5), toAsync, length);

    expect(res).resolves.toBe(4);
  });

  it('length with pipe 3', async () => {
    const start = Date.now();

    const res = await pipe(
      range(1, 10),
      toAsync,
      filter(x => delay(500, x % 2)),
      concurrent(5),
      length,
    );

    const end = Date.now();

    expect(res).toBe(5);
    expect(end - start).toBeLessThan(1500);
  });

  it('length with pipe 4', () => {
    const res = pipe(
      range(1, 10),
      map(x => x + 2),
      length,
    );

    expect(res).toBe(9);
  });
});
