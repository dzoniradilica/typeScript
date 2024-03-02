function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log(`result: ${num}`);
}

function addHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResult(add(10, 12));

let combineValues: (a: number, b: number) => number;

combineValues = add;

console.log(combineValues(10, 20));

addHandle(10, 23, result => {
  console.log(result);
});
