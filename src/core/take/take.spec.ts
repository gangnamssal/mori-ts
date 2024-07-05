import take from './take';
import * as mori from '..';

describe('take', () => {
  it('should take the first n elements from an iterable', () => {
    const iter = take(3, [1, 2, 3, 4, 5]);
    const iter2 = mori.toArray(take(3, [1, 2, 3, 4, 5]));

    expect([...iter]).toEqual([1, 2, 3]);
    expect(iter2).toEqual([1, 2, 3]);
  });

  it('should take the first n elements from an async iterable', async () => {
    const iter = take(
      3,
      (async function* () {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
      })(),
    );

    const iter2 = mori.toArray(
      take(
        3,
        (async function* () {
          yield 1;
          yield 2;
          yield 3;
          yield 4;
          yield 5;
        })(),
      ),
    );

    const iter3 = await mori.toArray(
      take(
        2,
        (async function* () {
          yield 1;
          yield 2;
          yield 3;
          yield 4;
          yield 5;
        })(),
      ),
    );

    expect(iter.next()).resolves.toEqual({ value: 1, done: false });
    expect(iter.next()).resolves.toEqual({ value: 2, done: false });
    expect(iter.next()).resolves.toEqual({ value: 3, done: false });
    expect(iter.next()).resolves.toEqual({ value: undefined, done: true });

    expect(iter2).resolves.toEqual([1, 2, 3]);
    expect(iter3).toEqual([1, 2]);
  });

  it('should take the first n elements from an iterable with promises', async () => {
    const iter = take(3, [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
      Promise.resolve(5),
    ]);

    expect([...iter]).toEqual([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
  });

  it('take with pipe', async () => {
    const res = mori.pipe([1, 2, 3, 4, 5], mori.take(3), mori.toArray);
    const res2 = mori.pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3), Promise.resolve(4)],
      mori.take(1),
      mori.toArray,
    );
    const res3 = await mori.pipe(Promise.resolve([1, 2, 3, 4, 5]), mori.take(2), mori.toArray);
    const res4 = mori.pipe(Promise.resolve([1, 2, 3, 4, 5]), mori.take(4), mori.toArray);

    expect(res).toEqual([1, 2, 3]);
    expect(res2).toEqual([Promise.resolve(1)]);
    expect(res3).toEqual([1, 2]);
    expect(res4).resolves.toEqual([1, 2, 3, 4]);
  });
});
