window.onload = function () {

  //Function to perform calculation

  const calculate = (n1, operator, n2) => {
    let result = ''
    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2)
    }

    return result
  }

  //Grabbing main elements through DOM

  const calculator = document.querySelector('.calculator')
  const display = calculator.querySelector('.calculator_display')
  const keys = calculator.querySelector('.calculator_keys')

  /*Identifying all the buttons

  keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
      const key = e.target;
      const action = key.dataset.action;

      if (!action) {
        console.log('number key!');
      }
      if (action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide') {
        console.log('operator key!');
      }
      if (action === 'decimal') {
        console.log('decimal key!');
      }
      if (action === 'plus_minus') {
        console.log('plus-minus key!');
      }
      if (action === 'square_root') {
        console.log('square root key!');
      }
      if (action === 'clear') {
        console.log('clear!');
      }
      if (action === 'calculate') {
        console.log('calculate key!');
      }
    }
  })
  */
  keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
      const key = e.target
      const action = key.dataset.action
      const keyContent = key.textContent
      const displayedNum = display.textContent
      const previousKeyType = calculator.dataset.previousKeyType
      //Removing class from the operator upon clicking on any button after operator has been clicked
      Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))

      //When user hits any number key

      if (!action) {
        if (
          displayedNum === '0' ||
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
        ) {
          display.textContent = keyContent
        } else {
          display.textContent = displayedNum + keyContent
        }
        //Storing key type
        calculator.dataset.previousKeyType = 'number'
      }

      //When user hits the decimal key

      if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
          display.textContent = displayedNum + '.'
        } else if (
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
        ) {
          display.textContent = '0.'
        }
        //Storing key type
        calculator.dataset.previousKeyType = 'decimal'
      }
      //When user hits the square root key

      if (action === 'square_root') {
        //Storing key type
        calculator.dataset.previousKeyType = 'square_root';
        let square = Math.sqrt(displayedNum);
        display.textContent = square;
        return square;
      }
      //When user hits any operator key

      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        //Making the calculator able to perform consecutive calculations
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum

        if (
          firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
        ) {
          const calcValue = calculate(firstValue, operator, secondValue)
          display.textContent = calcValue
          calculator.dataset.firstValue = calcValue
        } else {
          calculator.dataset.firstValue = displayedNum
        }
        //To highlight the operator key upon hitting it, a class has been added to the operator key
        key.classList.add('is-depressed')
        //Storing key type
        calculator.dataset.previousKeyType = 'operator'
        calculator.dataset.operator = action
      }

      //When user hits the clear key      

      if (action === 'clear') {
        if (key.textContent === 'AC') {
          calculator.dataset.firstValue = '';
          calculator.dataset.secondValue = '';
          calculator.dataset.modValue = '';
          calculator.dataset.operator = '';
          calculator.dataset.previousKeyType = '';
        } else {
          key.textContent = 'AC'
        }

        display.textContent = 0
        //Storing key type
        calculator.dataset.previousKeyType = 'clear'
      }

      if (action !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
      }

      //When user hits the calculate key

      if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        let secondValue = displayedNum

        if (firstValue) {
          if (previousKeyType === 'calculate') {
            firstValue = displayedNum
            secondValue = calculator.dataset.modValue
          }

          display.textContent = calculate(firstValue, operator, secondValue)
        }

        calculator.dataset.modValue = secondValue
        //Storing key type
        calculator.dataset.previousKeyType = 'calculate'
      }
    }
  })
}