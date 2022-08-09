let operandOne;
let operandTwo;
let operator;
const screen = document.querySelector('.screen');
console.log(screen);

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

function main() {
  operandOne = 0;
  screen.textContent = operandOne;
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => button.addEventListener('click', clickBtn));
}

function clickBtn(e) {
  if (e.target.classList.contains('btn-number')) {
    if (!operator) {
      operandOne = +screen.textContent; // '+' to remove whitespace
      operandOne += e.target.textContent;
      operandOne = +operandOne; // '+' to remove '0' if first character
      screen.textContent = operandOne;
    }
  }
}

main();
