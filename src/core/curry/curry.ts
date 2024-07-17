function curry<A, B extends any[], R>(
  fn: (a: A, ...args: B) => R,
  ...args: B
): B extends [] ? (a: A) => R : (...moreArgs: Parameters<typeof fn>) => ReturnType<typeof fn>;

function curry<A, B extends any[], R>(fn: (a: A, ...args: B) => R, ...args: B) {
  return args.length >= fn.length
    ? fn(...args)
    : (...moreArgs: Parameters<typeof fn>) => curry(fn, ...args, ...moreArgs);
}

export default curry;
