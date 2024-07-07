import toAsync from './to-async';

describe('toAsync', () => {
  it('toAsync with array', async () => {
    const iter = toAsync([1, 2, 3]);
    expect(await iter.next()).toEqual({ done: false, value: 1 });
    expect(await iter.next()).toEqual({ done: false, value: 2 });
    expect(await iter.next()).toEqual({ done: false, value: 3 });
    expect(await iter.next()).toEqual({ done: true, value: undefined });
  });

  it('toAsync with array promise', async () => {
    const iter = toAsync([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
    expect(await iter.next()).toEqual({ done: false, value: 1 });
    expect(await iter.next()).toEqual({ done: false, value: 2 });
    expect(await iter.next()).toEqual({ done: false, value: 3 });
    expect(await iter.next()).toEqual({ done: true, value: undefined });
  });

  it('toAsync with promise array', async () => {
    const iter = toAsync(await Promise.resolve([1, 2, 3]));
    expect(await iter.next()).toEqual({ done: false, value: 1 });
    expect(await iter.next()).toEqual({ done: false, value: 2 });
    expect(await iter.next()).toEqual({ done: false, value: 3 });
    expect(await iter.next()).toEqual({ done: true, value: undefined });
  });
});
