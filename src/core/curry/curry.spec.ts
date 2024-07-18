import curry from './curry';

describe('curry', () => {
  it('should curry a function', () => {
    const add = curry((a: number, b: number) => a + b);
    const addOne = add(1);
    const addTwo = addOne(2);
    expect(addTwo).toBe(3);
  });

  it('should curry a function with multiple arguments', () => {
    const add = curry((a: number, b: number, c: number) => a + b + c);
    const addOne = add(1);
    const addTwo = addOne(2);
    const addThree = addTwo(3);
    expect(addThree).toBe(6);
  });
});
