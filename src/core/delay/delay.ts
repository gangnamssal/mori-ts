function delay(time: number): Promise<void>;

function delay<A>(time: number, value: A): Promise<A>;

function delay<A>(time: number, value?: A): Promise<A | undefined> {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.catch(reject);
    }

    setTimeout(() => {
      resolve(value);
    }, time);
  });
}
export default delay;
