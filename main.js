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
    let partsOfNumber = operandTwo.split('.');
    if (partsOfNumber[1]) {
      //Keeps decimals even if they are only zeroes
      operandTwo = -partsOfNumber[0] + '.' + partsOfNumber[1];
    } else {
      operandTwo = '' + -operandTwo;
    }
    screen.textContent = operandTwo;
  } else {
    let partsOfNumber = operandOne.split('.');
    if (partsOfNumber[1]) {
      operandOne = -partsOfNumber[0] + '.' + partsOfNumber[1];
    } else {
      operandOne = '' + -operandOne;
    }
    screen.textContent = operandOne;
  }
}

function calcPercent() {
  if (!operator) {
    operandOne /= 100;
    operandOne = roundDown(operandOne);
    screen.textContent = operandOne;
  } else {
    if (!operandTwo) {
      operandTwo = operandOne;
    }
    operandTwo *= operandOne;
    operandTwo /= 100;
    operandTwo = roundDown(operandTwo);
    screen.textContent = operandTwo;
  }
}

function addDecimal() {
  if (calculationAgain) {
    calculationAgain = false;
    operandOne = '0';
    operator = '';
  }
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
    console.log('105: ' + operandOne);
    let partsOfNumber = operandOne.split('.');
    if (partsOfNumber[1] && +partsOfNumber[1] == 0) {
      /*
      Removes trailing zeroes with first operand when pressing '='
      without having an operator.
      */
      operandOne = partsOfNumber[0];
      screen.textContent = operandOne;
    }
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
  operandOne = roundDown(operandOne);
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
  operandOne = '' + operandOne;
  if (operandOne.includes('e')) {
    console.log(operandOne);
    operandOne = '0.000000' + operandOne[0];
  }
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
    console.log('176');
  }
  if (!operator) {
    if (`${operandOne}`.length < 16) {
      if (e.key) {
        operandOne += e.key;
      } else {
        operandOne += e.target.textContent;
      }
      console.log('185: ' + operandOne);
      if (operandOne.indexOf('0') === 0 && operandOne.indexOf('.') !== 1) {
        operandOne = +operandOne; // removes '0' if first character
      }
      operandOne = '' + roundDown(operandOne, true);
      if (operandOne.includes('e')) {
        operandOne = '0.000000' + operandOne[0];
      }

      console.log('190: ' + operandOne);
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
      console.log(operandTwo);
      operandTwo = '' + roundDown(operandTwo, true);
      if (operandTwo.includes('e')) {
        operandTwo = '0.000000' + operandTwo[0];
      }
      console.log(operandTwo);
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

function roundDown(number, numBtnOrNot) {
  /*
  numBtnOrNot allows to type 0.0001 without calculator forcing it to be
  '0' while allowing 10.0000/10 be '1' and not 1.0000 AND do all
  rounding in one function.
  */
  let programmersLittleHelper = `${number}`.split('.');
  if (
    programmersLittleHelper[1] &&
    programmersLittleHelper[1].length > 7 &&
    programmersLittleHelper[1].includes('0000000')
  ) {
    /*
    Fixes issue with typing '0.00000005' being turned into '0' instead of
    '0.0000000'
    */
    programmersLittleHelper[1] = '00000000';
  }
  if (programmersLittleHelper[0] === '9999999999999999') {
    //Fix incorrectly rounding '9999999999999999' to '10000000000000000'
    return programmersLittleHelper[0];
  }
  let helperTwo = programmersLittleHelper[0].length;
  if (numBtnOrNot && +programmersLittleHelper[1] == 0) {
    if (helperTwo > 9) {
      let helperThree = 16 - helperTwo;
      if (programmersLittleHelper[1].length > helperThree) {
        number = programmersLittleHelper[0] + '.' + '0'.repeat(helperThree);
      }
    } else if (programmersLittleHelper[1].length > 7) {
      number = programmersLittleHelper[0] + '.' + '0'.repeat(7);
    }
  } else if (helperTwo > 9) {
    let helperThree = 16 - helperTwo;
    number *= 10 ** helperThree;
    number = Math.floor(number);
    number /= 10 ** helperThree;
  } else {
    number *= 10 ** 7;
    number = Math.floor(number);
    number /= 10 ** 7;
  }
  return number;
}

main();
