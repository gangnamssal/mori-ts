import reduce from '../reduce/reduce';

function join<A>(sep: string, iter: Iterable<A>): string;
function join<A>(sep: string): (iter: Iterable<A>) => string;
function join<A extends Iterable<unknown>>(sep = ',', iter?: A): string | ((iter: A) => string) {
  if (!iter) return (iter: A) => join(sep, iter);

  return reduce((a, b) => `${a}${sep}${b}`, iter) as string;
}

export default join;
