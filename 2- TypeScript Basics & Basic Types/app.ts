function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log(num);
}

function addAndHandler(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResult(add(20, 10));

let combineValues: (n1: number, n2: number) => number;

combineValues = add;

console.log(combineValues(20, 20));
addAndHandler(10, 20, (result) => {
  console.log(result);
});
