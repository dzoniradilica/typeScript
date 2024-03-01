type Combinable = number | string;
type ConvresionDescriptor = 'as-number' | 'as-text';

function combination(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConvresionDescriptor
) {
  let result;

  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +input1 + +input2;
  } else result = input1.toString() + input2.toString();

  //   if (resultConversion === 'as-number') return +result;
  //   else return result.toString();

  return result;
}

const combineAges = combination(10, 20, 'as-number');
console.log(combineAges);

const combineAgesStr = combination('12', '10', 'as-number');
console.log(combineAgesStr);

const combineNames = combination('alo', 'djes', 'as-text');
console.log(combineNames);
