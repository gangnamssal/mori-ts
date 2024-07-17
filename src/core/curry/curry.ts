function curry(fn: any, ...args: any) {
  return function inner(...innerArgs: any) {
    const allArgs = args.concat(innerArgs);

    if (allArgs.length >= fn.length) {
      return fn(...allArgs);
    }
    return curry(fn, ...allArgs);
  };
}

export default curry;
