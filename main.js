let operandOne;
let operandTwo;
let operator = '';
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
  operandTwo = '';
  operator = null;
  screen.textContent = operandOne;
}

function operate() {
  if (!operator) {
    console.log('Ji!');
    return;
  }
  if (!operandTwo) {
    operandTwo = operandOne;
  }
  operandOne = +operator(operandOne, operandTwo);
  operandTwo = '';
  screen.textContent = operandOne;
  console.log(operandOne);
  return operandOne;
}

function main() {
  operandOne = 0;
  operandTwo = '';
  screen.textContent = operandOne;
  const numButtons = document.querySelectorAll('.btn-number');
  numButtons.forEach((button) => button.addEventListener('click', clickNumBtn));
  const operatorButtons = document.querySelectorAll('.btn-operate');
  operatorButtons.forEach((button) =>
    button.addEventListener('click', clickOperatorBtn)
  );
  document.querySelector('.btn-equal').addEventListener('click', operate);
}

function clickNumBtn(e) {
  if (!operator) {
    operandOne += e.target.textContent;
    operandOne = +operandOne; // '+' to remove '0' if first character
    screen.textContent = operandOne;
  } else {
    operandTwo += e.target.textContent;
    operandTwo = +operandTwo;
    screen.textContent = operandTwo;
  }
}

function clickOperatorBtn(e) {
  // Calculators allow to change the operator, i.e. '5 - + 5 = 10'
  if (!operandTwo) {
    // Global scope for function => using property accessor 'window'
    operator = window[e.target.id];
  } else {
    operate();
    operator = window[e.target.id];
  }
}

main();
// operate('', '', clear);
