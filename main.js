let operandOne;
let operandTwo;
let operator = '';
let calculationAgain;
const screen = document.querySelector('.screen');

function add(a, b) {
  return +a + +b;
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
    operandOne = roundNumber(operandOne);
    screen.textContent = operandOne;
  } else {
    if (!operandTwo) {
      operandTwo = operandOne;
    }
    operandTwo *= operandOne;
    operandTwo /= 100;
    operandTwo = roundNumber(operandTwo);
    screen.textContent = operandTwo;
  }
}

function addDecimal() {
  if (!operandTwo && !operator) {
    operandOne += '';
    if (operandOne.indexOf('.') === -1 && `${operandOne}`.length < 16) {
      operandOne += '.';
      screen.textContent = operandOne;
    }
  } else {
    operandTwo += '';
    if (operandTwo.indexOf('.') === -1 && `${operandTwo}`.length < 16) {
      operandTwo += '.';
      screen.textContent = operandTwo;
    }
  }
}

function delNum() {
  if (calculationAgain) {
    return;
  }
  if (!operandTwo && !operator) {
    operandOne = operandOne.toString();
    operandOne = operandOne.slice(0, -1);
    if (!operandOne) {
      operandOne = 0;
    } //else if (operandOne[length - 1] !== '.') {
    //operandOne = +operandOne;
    //}
    screen.textContent = operandOne;
  } else {
    operandTwo = operandTwo.toString();
    operandTwo = operandTwo.slice(0, -1);
    if (!operandTwo) {
      operandTwo = 0;
    } //else if (operandTwo[length - 1] !== '.') {
    //operandTwo = +operandTwo;
    //}
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
  } else if (!operandTwo && operandTwo !== 0) {
    operandTwo = operandOne;
  }
  if (operator == divide && +operandTwo == 0) {
    raiseError('DIVIDE BY ZERO');
    return;
  }
  operandOne = operator(operandOne, operandTwo);
  if (+operandOne >= 10 ** 16) {
    raiseError('OVERFLOW');
    return;
  }
  operandOne = roundNumber(operandOne);
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

function raiseError(errorMessage) {
  screen.textContent = errorMessage;
  operandOne = 0;
  operandTwo = '';
  operator = '';
  calculationAgain = false;
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
  document.querySelector('#btn-equal').addEventListener('click', operate);
  document.querySelector('.btn-clear').addEventListener('click', clear);
  document.querySelector('#btn-percent').addEventListener('click', calcPercent);
  document
    .querySelector('#btn-plus-minus')
    .addEventListener('click', plusMinus);
  document.querySelector('#btn-del').addEventListener('click', delNum);
  document.querySelector('#btn-decimal').addEventListener('click', addDecimal);
  window.addEventListener('keydown', pressButton);
}

function clickNumBtn(e) {
  if (calculationAgain) {
    operator = '';
    operandOne = 0;
    calculationAgain = false;
  }
  if (!operator) {
    if (`${operandOne}`.length < 16) {
      if (e.key) {
        operandOne += e.key;
      } else {
        operandOne += e.target.textContent;
      }
      console.log(operandOne);
      if (operandOne.indexOf('0') === 0 && operandOne.indexOf('.') !== 1) {
        operandOne = +operandOne; // removes '0' if first character
      }
      screen.textContent = operandOne;
    }
  } else {
    if (`${operandTwo}`.length < 16) {
      if (e.key) {
        operandTwo += e.key;
      } else {
        operandTwo += e.target.textContent;
      }
      if (operandTwo.indexOf('0') === 0 && operandTwo.indexOf('.') !== 1) {
        operandTwo = +operandTwo;
      }
      screen.textContent = operandTwo;
    }
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

function pressButton(e) {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(function (button) {
    button.classList.remove('active');
    if (e.key == button.textContent) {
      button.click();
      if (e.key == '+') {
        button.classList.add('active');
      }
    } else if (
      (e.key == '/' && button.id == 'divide') ||
      (e.key == '-' && button.id == 'subtract') ||
      (e.key == '*' && button.id == 'multiply')
    ) {
      button.click();
      button.classList.add('active');
    } else if (
      (e.key == 'Backspace' && button.id == 'btn-del') ||
      (e.key == 'Enter' && button.id == 'btn-equal')
    ) {
      button.click();
    }
  });
}

function roundNumber(number) {
  let programmersLittleHelper = `${number}`.split('.');
  let helperTwo = programmersLittleHelper[0].length;
  if (helperTwo > 9) {
    let helperThree = 16 - helperTwo;
    number *= 10 ** helperThree;
    number = Math.round(number);
    number /= 10 ** helperThree;
  } else {
    number *= 10 ** 7;
    number = Math.round(number);
    number /= 10 ** 7;
  }
  return number;
}

main();
