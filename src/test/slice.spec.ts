import { pipe, toArray, toAsync, slice, map, delay, concurrent } from '../core';

describe('slice', () => {
  it('slice has two number', () => {
    const arr = [1, 2, 3];

    const res = slice(0, 3, arr);

    expect([...res]).toEqual([1, 2, 3]);

    const res2 = slice(1, 3, arr);

    expect([...res2]).toEqual([2, 3]);

    const res3 = slice(2, 3, arr);

    expect([...res3]).toEqual([3]);

    const res4 = slice(3, 3, arr);

    expect([...res4]).toEqual([]);

    const srt = '123';

    const res5 = slice(0, 3, srt);

    expect([...res5]).toEqual(['1', '2', '3']);

    const res6 = slice(1, 3, srt);

    expect([...res6]).toEqual(['2', '3']);

    const res7 = slice(2, 3, srt);

    expect([...res7]).toEqual(['3']);
  });

  it('slice has two number and start >= end', () => {
    const res = slice(3, 1, [1, 2, 3]);

    expect([...res]).toEqual([]);

    const res2 = slice(3, 3, [1, 2, 3]);

    expect([...res2]).toEqual([]);

    const res3 = slice(-1, -3, [1, 2, 3]);

    expect([...res3]).toEqual([]);
  });

  it('slice has one number', () => {
    const res = slice(3, [1, 2, 3]);

    expect([...res]).toEqual([]);

    const res2 = slice(2, [1, 2, 3]);

    expect([...res2]).toEqual([3]);

    const res3 = slice(1, [1, 2, 3]);

    expect([...res3]).toEqual([2, 3]);

    const res4 = slice(0, [1, 2, 3]);

    expect([...res4]).toEqual([1, 2, 3]);
  });

  it('slice has two async number', async () => {
    const arr = [1, 2, 3];

    const res = await pipe(arr, toAsync, slice(0, 3), toArray);

    expect(res).toEqual([1, 2, 3]);

    const res2 = await pipe(arr, toAsync, slice(1, 3), toArray);

    expect(res2).toEqual([2, 3]);

    const res3 = await pipe(arr, toAsync, slice(2, 3), toArray);

    expect(res3).toEqual([3]);
  });

  it('slice has two async number and start >= end', async () => {
    const arr = [1, 2, 3];

    const res = await pipe(arr, toAsync, slice(3, 1), toArray);

    expect(res).toEqual([]);

    const res2 = await pipe(arr, toAsync, slice(3, 3), toArray);

    expect(res2).toEqual([]);
  });

  it('slice has one async number', async () => {
    const arr = [1, 2, 3];

    const res = await pipe(arr, toAsync, slice(3), toArray);

    expect(res).toEqual([]);

    const res2 = await pipe(arr, toAsync, slice(2), toArray);

    expect(res2).toEqual([3]);

    const res3 = await pipe(arr, toAsync, slice(1), toArray);

    expect(res3).toEqual([2, 3]);

    const res4 = await pipe(arr, toAsync, slice(0), toArray);

    expect(res4).toEqual([1, 2, 3]);
  });

  it('slice has empty array', () => {
    const res = slice(0, 3, []);

    expect([...res]).toEqual([]);

    const res2 = slice(1, 3, []);

    expect([...res2]).toEqual([]);

    const res3 = slice(2, 3, []);

    expect([...res3]).toEqual([]);

    const res4 = slice(3, 3, []);

    expect([...res4]).toEqual([]);

    const res5 = slice(0, 3, '');

    expect([...res5]).toEqual([]);

    const res6 = slice(1, 3, '');

    expect([...res6]).toEqual([]);

    const res7 = slice(2, 3, '');

    expect([...res7]).toEqual([]);
  });

  it('slice has minus number', () => {
    const res = slice(-1, 3, [1, 2, 3]);

    expect([...res]).toEqual([3]);

    const res2 = slice(-2, 3, [1, 2, 3]);

    expect([...res2]).toEqual([2, 3]);

    const res3 = slice(-3, 3, [1, 2, 3]);

    expect([...res3]).toEqual([1, 2, 3]);

    const res4 = slice(-4, 3, [1, 2, 3]);

    expect([...res4]).toEqual([1, 2, 3]);

    const res5 = slice(-1, 3, '123');

    expect([...res5]).toEqual(['3']);

    const res6 = slice(-2, 3, '123');

    expect([...res6]).toEqual(['2', '3']);

    const res7 = slice(-3, 3, '123');

    expect([...res7]).toEqual(['1', '2', '3']);

    const res8 = slice(-4, 3, '123');

    expect([...res8]).toEqual(['1', '2', '3']);
  });

  it('slice has async minus number', async () => {
    const arr = [1, 2, 3];

    const res = await pipe(arr, toAsync, slice(-1, 3), toArray);

    expect(res).toEqual([3]);

    const res2 = await pipe(arr, toAsync, slice(-2, 3), toArray);

    expect(res2).toEqual([2, 3]);

    const res3 = await pipe(arr, toAsync, slice(-3, 3), toArray);

    expect(res3).toEqual([1, 2, 3]);

    const res4 = await pipe(arr, toAsync, slice(-4, 3), toArray);

    expect(res4).toEqual([1, 2, 3]);

    const res5 = await pipe(arr, toAsync, slice(-1, 3), toArray);

    expect(res5).toEqual([3]);

    const res6 = await pipe(arr, toAsync, slice(-2, 3), toArray);

    expect(res6).toEqual([2, 3]);

    const res7 = await pipe(arr, toAsync, slice(-3, 3), toArray);

    expect(res7).toEqual([1, 2, 3]);

    const res8 = await pipe(arr, toAsync, slice(-4, 3), toArray);

    expect(res8).toEqual([1, 2, 3]);
  });

  it('slice with pipe', () => {
    const arr = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
      Promise.resolve(5),
    ];

    const res = pipe(
      arr,
      toAsync,
      map(item => item * 2),
      slice(1, 3),
      toArray,
    );

    expect(res).resolves.toEqual([4, 6]);
  });

  it('slice with pipe 2', async () => {
    const arr = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
      Promise.resolve(5),
    ];

    const start = Date.now();

    const res = await pipe(
      arr,
      toAsync,
      map(item => delay(100, item * 2)),
      concurrent(3),
      slice(1, 3),
      toArray,
    );

    const end = Date.now();

    expect(res).toEqual([4, 6]);
    expect(end - start).toBeLessThan(210);
  }, 10000);

  it('slice with pipe 3', async () => {
    const arr = [
      Promise.resolve(''),
      Promise.resolve('1'),
      Promise.resolve('12'),
      Promise.resolve('123'),
      Promise.resolve('1234'),
    ];

    const start = Date.now();

    const res = await pipe(
      arr,
      toAsync,
      map(item => delay(100, item)),
      concurrent(3),
      slice(-1),
      toArray,
    );

    const end = Date.now();

    expect(res).toEqual(['1234']);
    expect(end - start).toBeLessThan(210);
  }, 10000);
});
