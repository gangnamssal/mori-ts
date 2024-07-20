import pipe from './pipe';
import { filter, map, reduce, toArray, toAsync } from '..';

describe('pipe', () => {
  it('pipe with functions', () => {
    const res = pipe(
      0,
      a => a + 1,
      a => a + 10,
      a => a + 100,
    );

    expect(res).toBe(111);
  });

  it('pipe with map', () => {
    const res = pipe(
      [1, 2, 3],
      map(a => a + 1),
      map(a => a + 10),
      map(a => a + 100),
    );
    expect([...res]).toEqual([112, 113, 114]);

    const res2 = pipe(
      [1, 2, 3],
      map(a => a + 1),
      map(a => a + 10),
      map(a => a + 100),
      toArray,
    );
    expect(res2).toEqual([112, 113, 114]);
  });

  it('pipe with map on object', () => {
    const res = pipe(
      [{ a: 1 }, { a: 2 }, { a: 3 }],
      map(a => ({ a: a.a + 1 })),
      map(a => ({ a: a.a + 10 })),
      map(a => ({ a: a.a + 100 })),
    );
    expect([...res]).toEqual([{ a: 112 }, { a: 113 }, { a: 114 }]);

    const res2 = pipe(
      [{ a: 1 }, { a: 2 }, { a: 3 }],
      map(a => ({ a: a.a + 1 })),
      map(a => ({ a: a.a + 10 })),
      map(a => ({ a: a.a + 100 })),
      toArray,
    );
    expect(res2).toEqual([{ a: 112 }, { a: 113 }, { a: 114 }]);
  });

  it('pipe with map, promise', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      map(a => a + 1),
      map(a => a + 10),
      map(a => a + 100),
    );
    expect([...res]).toEqual([112, 113, 114]);

    const res2 = await pipe(
      Promise.resolve([1, 2, 3]),
      map(a => a + 1),
      map(a => a + 10),
      map(a => a + 100),
      toArray,
    );
    expect(res2).toEqual([112, 113, 114]);
  });

  it('pipe with map, promise', async () => {
    const res2 = await pipe(
      Promise.resolve([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]),
      toAsync,
      map(a => a + 1),
      map(a => a + 10),
      map(a => a + 100),
      toArray,
    );
    expect(res2[0]).toBe(112);
    expect(res2[1]).toBe(113);
    expect(res2[2]).toBe(114);
  });

  it('pipe with filter', () => {
    const res = pipe(
      [1, 2, 3],
      filter(a => a % 2 === 0),
    );
    expect([...res]).toEqual([2]);
    expect([...res]).not.toEqual([2, 3]);

    const res2 = pipe(
      [1, 2, 3],
      filter(a => a % 2 === 0),
      toArray,
    );
    expect(res2).toEqual([2]);
  });

  it('pipe with filter on array promise ', () => {
    const res = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      filter(a => a % 2 === 0),
    );
    expect(res.next().value).resolves.toBeUndefined();
    expect(res.next().value).resolves.toBe(2);
    expect(res.next().value).resolves.toBeUndefined();

    const res2 = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      filter(a => a % 2 === 0),
      toArray,
    );
    expect(res2[0]).resolves.toBeUndefined();
    expect(res2[1]).resolves.toBe(2);
    expect(res2[2]).resolves.toBeUndefined();
  });

  it('pipe with filter on array promise and number', () => {
    const res = pipe(
      [Promise.resolve(1), Promise.resolve(2), 4],
      filter(a => a % 2 === 0),
    );
    expect(res.next().value).resolves.toBeUndefined();
    expect(res.next().value).resolves.toBe(2);
    expect(res.next().value).toBe(4);

    const res2 = pipe(
      [Promise.resolve(1), Promise.resolve(2), 4],
      filter(a => a % 2 === 0),
      toArray,
    );
    expect(res2[0]).resolves.toBeUndefined();
    expect(res2[1]).resolves.toBe(2);
    expect(res2[2]).toBe(4);
  });

  it('pipe with filter promise array', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      filter(a => a % 2 === 0),
    );
    expect([...res]).toEqual([2]);
    expect([...res]).not.toEqual([2, 3]);

    const res2 = await pipe(
      Promise.resolve([1, 2, 3]),
      filter(a => a % 2 === 0),
      toArray,
    );

    expect(res2).toEqual([2]);
  });

  it('pipe with filter object', () => {
    const res = pipe(
      [{ a: 1 }, { a: 2 }, { a: 3 }],
      filter(a => a.a % 2 === 0),
    );

    expect([...res]).toEqual([{ a: 2 }]);
    expect([...res]).not.toEqual([{ a: 2 }, { a: 3 }]);

    const res2 = pipe(
      [{ a: 1 }, { a: 2 }, { a: 3 }],
      filter(a => a.a % 2 === 0),
      toArray,
    );

    expect(res2).toEqual([{ a: 2 }]);
  });

  it('pipe with reduce', () => {
    const res = pipe(
      [1, 2, 3],
      reduce((acc, a) => acc + a),
    );
    expect(res).toBe(6);
  });

  it('pipe with reduce on promise array', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      reduce((acc, a) => acc + a),
    );
    expect(res).toBe(6);

    const res2 = pipe(
      Promise.resolve([1, 2, 3]),
      reduce((acc, a) => acc + a),
    );
    expect(res2).resolves.toBe(6);
  });

  it('pipe with reduce on array promise', async () => {
    const res = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      reduce((acc, a) => acc + a),
    );
    expect(res).resolves.toBe(6);

    const res2 = await pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      reduce((acc, a) => acc + a),
    );
    expect(res2).toBe(6);
  });

  it('pipe with reduce on array promise and number', async () => {
    const res = pipe(
      [1, Promise.resolve(2), Promise.resolve(3)],
      reduce((acc, a) => acc + a),
    );
    expect(res).resolves.toBe(6);

    const res2 = await pipe(
      [1, Promise.resolve(2), 3],
      reduce((acc, a) => acc + a),
    );
    expect(res2).toBe(6);
  });

  it('pipe with reduce and map', () => {
    const res = pipe(
      [1, 2, 3],
      map(a => a + 1),
      reduce((acc, a) => acc + a),
    );
    expect(res).toBe(9);
  });

  it('pipe with reduce and map on promise array', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      map(a => a + 1),
      reduce((acc, a) => acc + a),
    );
    expect(res).toBe(9);

    const res2 = pipe(
      Promise.resolve([1, 2, 3]),
      map(a => a + 1),
      reduce((acc, a) => acc + a),
    );
    expect(res2).resolves.toBe(9);
  });

  it('pipe with reduce and map on array promise', async () => {
    const res = await pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      toAsync,
      map(a => a + 1),
      reduce((acc, a) => acc + a),
    );
    expect(res).toBe(9);

    const res2 = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      toAsync,
      map(a => a + 1),
      reduce((acc, a) => acc + a),
    );
    expect(res2).resolves.toBe(9);

    const res3 = pipe(
      [1, Promise.resolve(2), 3],
      toAsync,
      map(a => a + 1),
      reduce((acc, a) => acc + a),
    );
    expect(res3).resolves.toBe(9);

    const res4 = await pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      toAsync,
      filter(a => a % 2 === 0),
      map(a => a + 1),
      reduce((acc, a) => acc + a),
    );
    expect(res4).toBe(3);
  });

  it('pipe with map and filter', () => {
    const res = pipe(
      [1, 2, 3],
      filter(a => a % 2 === 0),
      map(a => a + 1),
    );
    expect([...res]).toEqual([3]);

    const res2 = pipe(
      [1, 2, 3],
      filter(a => a % 2 === 0),
      map(a => a + 1),
      toArray,
    );
    expect(res2).toEqual([3]);
  });

  it('pipe with map and filter and promise array', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      filter(a => a % 2 === 0),
      map(a => a + 1),
    );
    expect([...res]).toEqual([3]);

    const res2 = await pipe(
      Promise.resolve([1, 2, 3]),
      filter(a => a % 2 === 0),
      map(a => a + 1),
      toArray,
    );
    expect(res2).toEqual([3]);
  });

  it('pipe with reduce and filter', () => {
    const res = pipe(
      [1, 2, 3],
      filter(a => a % 2 === 0),
      reduce((acc, a) => acc + a),
    );
    expect(res).toBe(2);
  });

  it('pipe with reduce and filter on promise array', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      filter(a => a % 2 === 0),
      reduce((acc, a) => acc + a),
    );
    expect(res).toBe(2);

    const res2 = pipe(
      Promise.resolve([1, 2, 3]),
      filter(a => a % 2 !== 0),
      reduce((acc, a) => acc + a),
    );
    expect(res2).resolves.toBe(4);
  });

  it('pipe with reduce, filter and map', () => {
    const res = pipe(
      [1, 2, 3],
      filter(a => a % 2 === 0),
      map(a => a + 1),
      reduce((acc, a) => acc + a),
    );
    expect(res).toBe(3);
  });

  it('pipe with reduce, filter and map on promise array', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      filter(a => a % 2 === 0),
      map(a => a + 1),
      reduce((acc, a) => acc + a),
    );
    expect(res).toBe(3);
  });

  it('pipe with toAsync', () => {
    const iter = [1, 2, 3];
    const res = pipe(
      iter,
      map(a => a + 1),
      filter(a => a % 2 === 0),
      reduce((acc, a) => acc + a),
    );
    expect(res).toBe(6);

    const iter2 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
    const res2 = pipe(
      iter2,
      toAsync,
      map(a => a + 1),
      filter(a => a % 2 === 0),
      reduce((acc, a) => acc + a),
    );
    expect(res2).resolves.toBe(6);
  });
});
