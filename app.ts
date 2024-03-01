function add(n1: number, n2: number, shoResult: boolean, phrase: string) {
  if (shoResult) {
    console.log(`${phrase} ${n1 + n2}`);
  } else return console.log(n1 - n2);
}

const number1 = 5;
const number2 = 1.8;
const printResult = true;
const resultPhrase = 'Result is:';

add(number1, number2, printResult, resultPhrase);
