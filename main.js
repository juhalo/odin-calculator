let operandOne;
let operandTwo;
let operator = '';
let decimalPoint;
let calculationAgain;
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
    return; // Fixes issues when pressing '=' as first pressed operator
  }
  if (calculationAgain) {
    operandTwo = calculationAgain;
  } else if (!operandTwo) {
    operandTwo = operandOne;
  }
  operandOne = +operator(operandOne, operandTwo);
  /*
  calculationAgain makes sure that after entering the equals-to sign the
  logic when either pressing equals-to sign again, or pressing a number,
  is correct. When pressing a number we want to 'start over' with that
  number being the operandOne, and when pressing '=' again straight away
  we want to preform the same operation with the previous operandTwo.
  */
  if (operandTwo) {
    calculationAgain = operandTwo;
  }
  operandTwo = '';
  screen.textContent = operandOne;
  if (calculationAgain) {
    console.log(operandOne);
  }
  console.log('Hi');
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
  if (calculationAgain) {
    operator = '';
    operandOne = 0;
    calculationAgain = false;
  }
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
  if (calculationAgain) {
    calculationAgain = false;
  }
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
