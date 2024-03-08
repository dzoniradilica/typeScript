type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

function add(n1: Combinable, n2: Combinable, resultType: ConversionDescriptor) {
  let result;
  if (typeof n1 === "number" && typeof n2 === "number") {
    result = n1 + n2;
  } else {
    result = n1.toString() + n2.toString();
  }

  if (resultType === "as-number") {
    return +result;
  } else {
    return result.toString();
  }
}

const combinedAges = add(10, 20, "as-number");
console.log(combinedAges);

const combinedStrings = add("20", "24", "as-number");
console.log(combinedStrings);

const cominedNames = add("dzoni", " savic", "as-text");
console.log(cominedNames);
