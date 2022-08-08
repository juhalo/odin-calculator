function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(numOne, numTwo, functionName) {
  return functionName(numOne, numTwo);
}

// console.log(operate(2, 3, add));
// console.log(operate(2, 3, subtract));
// console.log(operate(2, 3, multiply));
// console.log(operate(2, 3, divide));
