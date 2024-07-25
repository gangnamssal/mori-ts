import map from './map';
import toArray from '../to-array/to-array';
import pipe from '../pipe/pipe';
import toAsync from '../to-async/to-async';
import delay from '../delay/delay';

describe('map', () => {
  it('map with array', () => {
    const array = [1, 2, 3];

    const result = map(value => value * 2, array);
    expect([...result]).toEqual([2, 4, 6]);
  });

  it('map with set', () => {
    const set = new Set([1, 2, 3]);

    const result = map(value => value * 2, set);
    expect([...result]).toEqual([2, 4, 6]);
  });

  it('map with map', () => {
    const map1 = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = map(([key, value]) => value * 2, map1);
    expect([...result]).toEqual([2, 4, 6]);
  });

  it('map with promise, number', async () => {
    const promise = Promise.resolve([1, 2, 3]);

    const result = map(value => value * 2, await promise);

    expect([...result]).toEqual([2, 4, 6]);
  });

  it('map with iterable', () => {
    const iterable = (function* () {
      yield 1;
      yield 2;
      yield 3;
    })();

    const result = map(value => value * 2, iterable);

    expect([...result]).toEqual([2, 4, 6]);
  });

  it('map with async iterable', async () => {
    const asyncIterable = (async function* () {
      yield 1;
      yield 2;
      yield 3;
    })();

    const result = map(value => value * 2, asyncIterable);

    expect(result.next()).resolves.toEqual({ done: false, value: 2 });
    expect(result.next()).resolves.toEqual({ done: false, value: 4 });
    expect(result.next()).resolves.toEqual({ done: false, value: 6 });
    expect(result.next()).resolves.toEqual({ done: true, value: undefined });
  });

  it('map with empty iterable', () => {
    const iterable = (function* () {})();
    const arr: any[] = [];

    const result = map(value => value * 2, iterable);
    expect([...result]).toEqual([]);

    const result2 = map(value => value * 2, arr);
    expect(toArray(result2)).toEqual([]);
  });

  it('map with toAsync', async () => {
    const iter = [1, 2, 3];

    const res = pipe(
      iter,
      toAsync,
      map(value => value * 2),
      toArray,
    );

    expect(res).resolves.toEqual([2, 4, 6]);
  });

  it('map with toAsync 2', async () => {
    const iter = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

    const res = await pipe(
      iter,
      toAsync,
      map(value => value * 2),
      toArray,
    );

    expect(res).toEqual([2, 4, 6]);
  });

  it('map with toAsync 3', async () => {
    const res = await pipe(
      [],
      toAsync,
      map(value => value * 2),
      toArray,
    );

    expect(res).toEqual([]);
  });

  it('map with delay', () => {
    const res = pipe(
      [1, 2, 3],
      map(value => delay(100, value)),
    );

    expect(res.next().value).resolves.toEqual(1);
  });
});
