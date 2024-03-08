function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log(num);
}
function addAndHandler(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
printResult(add(20, 10));
var combineValues;
combineValues = add;
console.log(combineValues(20, 20));
addAndHandler(10, 20, function (result) {
    console.log(result);
});
