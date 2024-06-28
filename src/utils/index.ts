export const isIterable = (value: any): value is Iterable<any> => {
  return typeof value?.[Symbol.iterator] === 'function';
};

export const isAsyncIterable = (value: any): value is AsyncIterable<any> => {
  return typeof value?.[Symbol.asyncIterator] === 'function';
};
