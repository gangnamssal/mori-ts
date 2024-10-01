import { filter, insert, join, map, pipe, range, toArray, toAsync } from '../core';

describe('insert', () => {
  it('inserts a value at the specified index', () => {
    const result = insert(1, 3, [1, 2]);
    expect([...result]).toEqual([1, 3, 2]);
  });

  it('inserts a value at the beginning of the iterable', () => {
    const result = insert(0, 3, [1, 2]);
    expect([...result]).toEqual([3, 1, 2]);
  });

  it('inserts a value at the end of the iterable', () => {
    const result = insert(2, 3, [1, 2]);
    expect([...result]).toEqual([1, 2, 3]);
  });

  it('inserts a value at the end of the iterable 2', () => {
    const result = insert(5, 3, [1, 2]);
    expect([...result]).toEqual([1, 2, 3]);
  });

  it('inserts a value at the specified index (async)', async () => {
    const result = await pipe([1, 2], toAsync, insert(1, 3), toArray);

    expect(result).toEqual([1, 3, 2]);
  });

  it('inserts a value at the beginning of the iterable (async)', async () => {
    const result = await pipe([1, 2], toAsync, insert(0, 3), toArray);

    expect(result).toEqual([3, 1, 2]);
  });

  it('inserts a value at the end of the iterable (async)', async () => {
    const result = await pipe([1, 2], toAsync, insert(2, 3), toArray);

    expect(result).toEqual([1, 2, 3]);
  });

  it('inserts a value at the end of the iterable 2 (async)', async () => {
    const result = await pipe([1, 2], toAsync, insert(5, 3), toArray);

    expect(result).toEqual([1, 2, 3]);
  });

  it('inserts with promise value', async () => {
    const result = await pipe([1, 2], toAsync, insert(1, Promise.resolve(3)), toArray);

    expect(result).toEqual([1, 3, 2]);
  });

  it('inserts with promise value 2', () => {
    const result = pipe([1, 2], insert(1, Promise.resolve(3)), toArray);

    expect(result).toEqual([1, Promise.resolve(3), 2]);
  });

  it('inserts with pipe', () => {
    const res = pipe(
      range(1, 10),
      insert(5, 100),
      map(a => a + 1),
      filter(a => a % 2 !== 0),
      toArray,
    );

    expect(res).toEqual([3, 5, 101, 7, 9]);
  });

  it('inserts with pipe 2', async () => {
    const res = await pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3), Promise.resolve(4), Promise.resolve(5)],
      toAsync,
      insert(3, 100),
      map(a => a + 1),
      toArray,
    );

    expect(res).toEqual([2, 3, 4, 101, 5, 6]);
  });

  it('inserts with string', () => {
    const res = pipe('hello', insert(3, 'l'), join(''));

    expect(res).toEqual('helllo');
  });

  it('inserts with string 2', () => {
    const res = pipe('', insert(3, 'l'), join(''));

    expect(res).toEqual('l');
  });
});
