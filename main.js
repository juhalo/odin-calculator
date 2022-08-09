let operandOne;
let operandTwo;
let operator = '0';
let decimalPoint;
const screen = document.querySelector('.screen');

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

function plusMinus(a) {
  return -a;
}

function calcPercent(a, b) {
  if (!operator) {
    a /= 100;
    screen.textContent = a;
  } else {
    if (!b) {
      b = a;
    }
    b *= a;
    b /= 100;
    screen.textContent = b;
  }
}

function addDecimal(a, b) {
  if (!b) {
    if (typeof a === 'number') {
      a += '.';
      screen.textContent = a;
    }
  } else {
    if (typeof b === 'number') {
      b += '.';
      screen.textContent = b;
    }
  }
}

function delNum(a, b) {
  if (!b) {
    a = a.toString();
    a = a.slice(0, -1);
    if (!a) {
      a = 0;
    }
    screen.textContent = a;
  } else {
    b = b.toString();
    b = b.slice(0, -1);
    if (!b) {
      b = 0;
    }
    screen.textContent = b;
  }
}

function clear() {
  operandOne = 0;
  operandTwo = null;
  operator = null;
  screen.textContent = operandOne;
}

function operate(numOne, numTwo, functionName) {
  return functionName(numOne, numTwo);
}

function main() {
  operandOne = 0;
  operandTwo = '';
  screen.textContent = operandOne;
  const numButtons = document.querySelectorAll('.btn-number');
  numButtons.forEach((button) => button.addEventListener('click', clickNumBtn));
}

function clickNumBtn(e) {
  if (!operator) {
    operandOne = +screen.textContent; // '+' to remove whitespace
    operandOne += e.target.textContent;
    operandOne = +operandOne; // '+' to remove '0' if first character
    screen.textContent = operandOne;
  } else {
    operandTwo += e.target.textContent;
    screen.textContent = operandTwo;
  }
}

main();
// operate('', '', clear);
