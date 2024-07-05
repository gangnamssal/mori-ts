import pipe from './pipe';
import * as mori from '..';

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
      mori.map(a => a + 1),
      mori.map(a => a + 10),
      mori.map(a => a + 100),
    );

    const res2 = pipe(
      [1, 2, 3],
      mori.map(a => a + 1),
      mori.map(a => a + 10),
      mori.map(a => a + 100),
      mori.toArray,
    );

    expect([...res]).toEqual([112, 113, 114]);
    expect(res2).toEqual([112, 113, 114]);
  });

  it('pipe with map on object', () => {
    const res = pipe(
      [{ a: 1 }, { a: 2 }, { a: 3 }],
      mori.map(a => ({ a: a.a + 1 })),
      mori.map(a => ({ a: a.a + 10 })),
      mori.map(a => ({ a: a.a + 100 })),
    );

    const res2 = pipe(
      [{ a: 1 }, { a: 2 }, { a: 3 }],
      mori.map(a => ({ a: a.a + 1 })),
      mori.map(a => ({ a: a.a + 10 })),
      mori.map(a => ({ a: a.a + 100 })),
      mori.toArray,
    );

    expect([...res]).toEqual([{ a: 112 }, { a: 113 }, { a: 114 }]);
    expect(res2).toEqual([{ a: 112 }, { a: 113 }, { a: 114 }]);
  });

  it('pipe with map, promise', () => {
    const res = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      mori.map(a => a + 1),
      mori.map(a => a + 10),
      mori.map(a => a + 100),
    );

    const res2 = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      mori.map(a => a + 1),
      mori.map(a => a + 10),
      mori.map(a => a + 100),
      mori.toArray,
    );

    expect([...res]).toEqual([Promise.resolve(112), Promise.resolve(113), Promise.resolve(114)]);
    expect(res2[0]).resolves.toBe(112);
    expect(res2[1]).resolves.toBe(113);
    expect(res2[2]).resolves.toBe(114);
  });

  it('pipe with map on promise, number', () => {
    const res = pipe(
      [1, Promise.resolve(2), Promise.resolve(3)],
      mori.map(a => a + 1),
      mori.map(a => a + 10),
      mori.map(a => a + 100),
    );

    const res2 = pipe(
      [1, Promise.resolve(2), Promise.resolve(3)],
      mori.map(a => a + 1),
      mori.map(a => a + 10),
      mori.map(a => a + 100),
      mori.toArray,
    );
    expect([...res]).toEqual([112, Promise.resolve(113), Promise.resolve(114)]);
    expect(res2[0]).toBe(112);
    expect(res2[1]).resolves.toBe(113);
    expect(res2[2]).resolves.toBe(114);
  });

  it('pipe with map, promise', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      mori.map(a => a + 1),
      mori.map(a => a + 10),
      mori.map(a => a + 100),
    );

    const res2 = await pipe(
      Promise.resolve([1, 2, 3]),
      mori.map(a => a + 1),
      mori.map(a => a + 10),
      mori.map(a => a + 100),
      mori.toArray,
    );

    expect([...res]).toEqual([112, 113, 114]);
    expect(res2).toEqual([112, 113, 114]);
  });

  it('pipe with map, promise', async () => {
    const res = await pipe(
      Promise.resolve([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]),
      mori.map(a => a + 1),
      mori.map(a => a + 10),
      mori.map(a => a + 100),
    );

    const res2 = await pipe(
      Promise.resolve([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]),
      mori.map(a => a + 1),
      mori.map(a => a + 10),
      mori.map(a => a + 100),
      mori.toArray,
    );

    expect([...res]).toEqual([Promise.resolve(112), Promise.resolve(113), Promise.resolve(114)]);
    expect(res2[0]).resolves.toBe(112);
    expect(res2[1]).resolves.toBe(113);
    expect(res2[2]).resolves.toBe(114);
  });

  it('pipe with filter', () => {
    const res = pipe(
      [1, 2, 3],
      mori.filter(a => a % 2 === 0),
    );

    const res2 = pipe(
      [1, 2, 3],
      mori.filter(a => a % 2 === 0),
      mori.toArray,
    );

    expect([...res]).toEqual([2]);
    expect([...res]).not.toEqual([2, 3]);

    expect(res2).toEqual([2]);
  });

  it('pipe with filter on array promise ', () => {
    const res = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      mori.filter(a => a % 2 === 0),
    );

    const res2 = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      mori.filter(a => a % 2 === 0),
      mori.toArray,
    );

    expect(res.next().value).resolves.toBeUndefined();
    expect(res.next().value).resolves.toBe(2);
    expect(res.next().value).resolves.toBeUndefined();

    expect(res2[0]).resolves.toBeUndefined();
    expect(res2[1]).resolves.toBe(2);
    expect(res2[2]).resolves.toBeUndefined();
  });

  it('pipe with filter on array promise and number', () => {
    const res = pipe(
      [Promise.resolve(1), Promise.resolve(2), 4],
      mori.filter(a => a % 2 === 0),
    );

    const res2 = pipe(
      [Promise.resolve(1), Promise.resolve(2), 4],
      mori.filter(a => a % 2 === 0),
      mori.toArray,
    );

    expect(res.next().value).resolves.toBeUndefined();
    expect(res.next().value).resolves.toBe(2);
    expect(res.next().value).toBe(4);

    expect(res2[0]).resolves.toBeUndefined();
    expect(res2[1]).resolves.toBe(2);
    expect(res2[2]).toBe(4);
  });

  it('pipe with filter promise array', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      mori.filter(a => a % 2 === 0),
    );

    const res2 = await pipe(
      Promise.resolve([1, 2, 3]),
      mori.filter(a => a % 2 === 0),
      mori.toArray,
    );

    expect([...res]).toEqual([2]);
    expect([...res]).not.toEqual([2, 3]);
    expect(res2).toEqual([2]);
  });

  it('pipe with filter object', () => {
    const res = pipe(
      [{ a: 1 }, { a: 2 }, { a: 3 }],
      mori.filter(a => a.a % 2 === 0),
    );

    const res2 = pipe(
      [{ a: 1 }, { a: 2 }, { a: 3 }],
      mori.filter(a => a.a % 2 === 0),
      mori.toArray,
    );

    expect([...res]).toEqual([{ a: 2 }]);
    expect([...res]).not.toEqual([{ a: 2 }, { a: 3 }]);

    expect(res2).toEqual([{ a: 2 }]);
  });

  it('pipe with reduce', () => {
    const res = pipe(
      [1, 2, 3],
      mori.reduce((acc, a) => acc + a),
    );

    expect(res).toBe(6);
  });

  it('pipe with reduce on promise array', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      mori.reduce((acc, a) => acc + a),
    );

    const res2 = pipe(
      Promise.resolve([1, 2, 3]),
      mori.reduce((acc, a) => acc + a),
    );

    expect(res).toBe(6);
    expect(res2).resolves.toBe(6);
  });

  it('pipe with reduce on array promise', async () => {
    const res = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      mori.reduce((acc, a) => acc + a),
    );

    const res2 = await pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      mori.reduce((acc, a) => acc + a),
    );

    expect(res).resolves.toBe(6);
    expect(res2).toBe(6);
  });

  it('pipe with reduce on array promise and number', async () => {
    const res = pipe(
      [1, Promise.resolve(2), Promise.resolve(3)],
      mori.reduce((acc, a) => acc + a),
    );

    const res2 = await pipe(
      [1, Promise.resolve(2), 3],
      mori.reduce((acc, a) => acc + a),
    );

    expect(res).resolves.toBe(6);
    expect(res2).toBe(6);
  });

  it('pipe with reduce and map', () => {
    const res = pipe(
      [1, 2, 3],
      mori.map(a => a + 1),
      mori.reduce((acc, a) => acc + a),
    );

    expect(res).toBe(9);
  });

  it('pipe with reduce and map on promise array', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      mori.map(a => a + 1),
      mori.reduce((acc, a) => acc + a),
    );

    const res2 = pipe(
      Promise.resolve([1, 2, 3]),
      mori.map(a => a + 1),
      mori.reduce((acc, a) => acc + a),
    );

    expect(res).toBe(9);
    expect(res2).resolves.toBe(9);
  });

  it('pipe with reduce and map on array promise', async () => {
    const res = await pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      mori.map(a => a + 1),
      mori.reduce((acc, a) => acc + a),
    );

    const res2 = pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      mori.map(a => a + 1),
      mori.reduce((acc, a) => acc + a),
    );

    const res3 = pipe(
      [1, Promise.resolve(2), 3],
      mori.map(a => a + 1),
      mori.reduce((acc, a) => acc + a),
    );

    expect(res).toBe(9);
    expect(res2).resolves.toBe(9);
    expect(res3).resolves.toBe(9);
  });

  it('pipe with map and filter', () => {
    const res = pipe(
      [1, 2, 3],
      mori.filter(a => a % 2 === 0),
      mori.map(a => a + 1),
    );

    const res2 = pipe(
      [1, 2, 3],
      mori.filter(a => a % 2 === 0),
      mori.map(a => a + 1),
      mori.toArray,
    );

    expect([...res]).toEqual([3]);
    expect(res2).toEqual([3]);
  });

  it('pipe with map and filter and promise array', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      mori.filter(a => a % 2 === 0),
      mori.map(a => a + 1),
    );

    const res2 = await pipe(
      Promise.resolve([1, 2, 3]),
      mori.filter(a => a % 2 === 0),
      mori.map(a => a + 1),
      mori.toArray,
    );

    expect([...res]).toEqual([3]);
    expect(res2).toEqual([3]);
  });

  it('pipe with reduce and filter', () => {
    const res = pipe(
      [1, 2, 3],
      mori.filter(a => a % 2 === 0),
      mori.reduce((acc, a) => acc + a),
    );

    expect(res).toBe(2);
  });

  it('pipe with reduce and filter on promise array', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      mori.filter(a => a % 2 === 0),
      mori.reduce((acc, a) => acc + a),
    );

    const res2 = pipe(
      Promise.resolve([1, 2, 3]),
      mori.filter(a => a % 2 !== 0),
      mori.reduce((acc, a) => acc + a),
    );

    expect(res).toBe(2);
    expect(res2).resolves.toBe(4);
  });

  it('pipe with reduce, filter and map', () => {
    const res = pipe(
      [1, 2, 3],
      mori.filter(a => a % 2 === 0),
      mori.map(a => a + 1),
      mori.reduce((acc, a) => acc + a),
    );

    expect(res).toBe(3);
  });

  it('pipe with reduce, filter and map on promise array', async () => {
    const res = await pipe(
      Promise.resolve([1, 2, 3]),
      mori.filter(a => a % 2 === 0),
      mori.map(a => a + 1),
      mori.reduce((acc, a) => acc + a),
    );

    expect(res).toBe(3);
  });
});
