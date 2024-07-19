import { filter, map, pipe, toAsync } from '..';
import some from './some';

describe('some', () => {
  it('some with array, result true', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = some(item => item > 3, arr);

    expect(result.next().value).toBe(true);
  });

  it('some with array, result false', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = some(item => item > 6, arr);

    expect(result.next().value).toBe(false);
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

    expect((await result.next()).value).toBe(true);
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

    expect((await result.next()).value).toBe(false);
  });

  it('some with pipe', async () => {
    const res = pipe(
      [1, 2, 3, 4, 5],
      map(item => item * 2),
      filter(item => item > 5),
      some(item => item > 10),
    );

    expect(res.next().value).toBe(false);

    const res2 = pipe(
      [1, 2, 3, 4, 5],
      toAsync,
      map(item => item * 2),
      filter(item => item > 5),
      some(item => item > 10),
    );

    expect((await res2.next()).value).toBe(false);
  });
});
