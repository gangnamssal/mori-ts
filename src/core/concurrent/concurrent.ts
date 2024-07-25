async function* concurrent<T>(...iters: AsyncIterable<T>[]): AsyncIterableIterator<T> {
  const promises = iters.map(iter =>
    (async function* () {
      for await (const item of iter) {
        yield item;
      }
    })(),
  );

  for await (const item of mergeAsyncIterables(...promises)) {
    yield item;
  }
}

async function* mergeAsyncIterables<T>(...iters: AsyncIterable<T>[]): AsyncIterableIterator<T> {
  const readers = iters.map(iter => iter[Symbol.asyncIterator]());
  const results = readers.map(reader => reader.next());

  while (readers.length > 0) {
    const next = await Promise.race(results.map((promise, i) => promise.then(value => ({ value, i }))));
    const { value, i } = next;

    if (value.done) {
      readers.splice(i, 1);
      results.splice(i, 1);
    } else {
      results[i] = readers[i].next();
      yield value.value;
    }
  }
}

export default concurrent;
