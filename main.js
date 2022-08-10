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

function plusMinus() {
  if (operandTwo) {
    operandTwo = -operandTwo;
    screen.textContent = operandTwo;
  } else {
    operandOne = -operandOne;
    screen.textContent = operandOne;
  }
}

function calcPercent() {
  if (!operator) {
    operandOne /= 100;
    screen.textContent = operandOne;
  } else {
    if (!operandTwo) {
      operandTwo = operandOne;
    }
    operandTwo *= operandOne;
    operandTwo /= 100;
    screen.textContent = operandTwo;
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

function delNum() {
  if (calculationAgain) {
    return;
  }
  if (!operandTwo) {
    operandOne = operandOne.toString();
    operandOne = operandOne.slice(0, -1);
    if (!operandOne) {
      operandOne = 0;
    }
    screen.textContent = operandOne;
  } else {
    operandTwo = operandTwo.toString();
    operandTwo = operandTwo.slice(0, -1);
    if (!operandTwo) {
      operandTwo = 0;
    }
    screen.textContent = operandTwo;
  }
}

function clear() {
  operandOne = 0;
  operandTwo = '';
  operator = '';
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
  console.log(operandOne);
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
  document.querySelector('.btn-clear').addEventListener('click', clear);
  document.querySelector('#btn-percent').addEventListener('click', calcPercent);
  document
    .querySelector('#btn-plus-minus')
    .addEventListener('click', plusMinus);
  document.querySelector('.btn-del').addEventListener('click', delNum);
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
    // operate function changes calculationAgain to be truthy, which breaks '3+3+3+...'
    calculationAgain = false;
  }
}

main();
