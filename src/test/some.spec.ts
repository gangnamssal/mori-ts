import { filter, map, pipe, toAsync, some } from '../core';

describe('some', () => {
  it('some with array, result true', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = some(item => item > 3, arr);

    expect(result).toBeTruthy();
  });

  it('some with array, result false', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = some(item => item > 6, arr);

    expect(result).toBeFalsy();
  });

  it('some with async iterable, result true', async () => {
    const asyncIterable = (async function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })();

    const result = some(item => item > 3, asyncIterable);

    expect(result).resolves.toBeTruthy();
  });

  it('some with async iterable, result false', async () => {
    const asyncIterable = (async function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })();

    const result = some(item => item > 6, asyncIterable);

    expect(result).resolves.toBeFalsy();
  });

  it('some with pipe', async () => {
    const res = pipe(
      [1, 2, 3, 4, 5],
      map(item => item * 2),
      filter(item => item > 5),
      some(item => item > 10),
    );

    expect(res).toBeFalsy();
  });

  it('some with pipe 2', async () => {
    const res = pipe(
      [1, 2, 3, 4, 5],
      toAsync,
      map(item => item * 2),
      filter(item => item > 5),
      some(item => item > 10),
    );

    expect(res).resolves.toBeFalsy();
  });

  it('some with pipe 3', async () => {
    const res = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3), Promise.resolve(4), Promise.resolve(5)],
      toAsync,
      map(item => item * 2),
      filter(item => item > 5),
      some(item => item > 10),
    );

    expect(res).resolves.toBeFalsy();
  });

  it('some with pipe 4', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3, 4, 5]),
      map(item => item * 2),
      filter(item => item > 5),
      some(item => item < 10),
    );

    expect(res).toBeTruthy();
  });

  it('some with empty string', () => {
    const res = some(item => item === 'a', '');

    expect(res).toBeFalsy();
  });
});
