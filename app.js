function add(n1, n2, shoResult, phrase) {
    if (shoResult) {
        console.log("".concat(phrase, " ").concat(n1 + n2));
    }
    else
        return console.log(n1 - n2);
}
var number1 = 5;
var number2 = 1.8;
var printResult = true;
var resultPhrase = 'Result is:';
add(number1, number2, printResult, resultPhrase);
