const addButton = document.querySelector('.add')
const minusButton = document.querySelector('.subtract')
const multiplyButton = document.querySelector('.multiply')
const divideButton = document.querySelector('.divide')
const buttons = document.getElementsByTagName('button')
const POSSIBLE_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '=', 'c']
let resultElem = document.querySelector('.calculator-screen')
let currentValue = Number(resultElem.value)
let oldValue = null
let currentOperator = ''
let lastCommand = ''

const add = (num1, num2) => {
    return num1 + num2
}

const subtract = (num1, num2) => {
    return num1 - num2
}

const multiply = (num1, num2) => {
    return num1 * num2
}

const divide = (num1, num2) => {
    return num1 / num2
}
// TAKE A LOOK AT THIS CODE HERE
const calculate = (operator='=') => {
    console.log(currentValue, oldValue)
    console.log(`operator: ${operator}`)
    if (oldValue != null && currentValue != null) {
        currentValue = operate(currentOperator, oldValue, currentValue)
        oldValue = currentValue
        resultElem.value = String(oldValue)
        console.log(`currentValue: ${currentValue}`)
        currentValue = null
    } else {
        if (operator == '+/-' || operator == '%') {
            if (oldValue == null && currentValue != null) {
                currentValue = operate(operator, currentValue)
                oldValue = currentValue
                resultElem.value = String(oldValue)
                console.log(`currentValue: ${currentValue}`)
                currentValue = null
            }
        }
    } 
}

const clear = () => {
    resultElem.value = '0'
    currentValue = 0
    oldValue = null
}

const plusMinus = () => {
    console.log('operation plus minus')
    return -1 * currentValue
}

const onePercentOfNum = () => {
    return 0.01 * currentValue
}

const operators = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
    "=": calculate,
    "clear": clear,
    "+/-": plusMinus,
    "%": onePercentOfNum,
    "c": clear,
}

const operate = (operator, num1, num2) => {
    console.log(`WHAT I THE FUCKING OPERATOR: ${operator}`)
    return operators[operator](num1, num2)
}

const handleButtonClick = (event) => {
    const value = event.target.value
    console.log(value)
    handleSubmit(value)
    
}
// FIX EQUAL SIGN ERROR
const handleSubmit = (value) => {

    if (!isNaN(value) || value == '.') {
        console.log(`Number: ${currentValue}`)
        if (Number(currentValue) == 0) {
            currentValue = String(value)
        } else {
            currentValue = String(currentValue) + String(value)
        }
        
        resultElem.value = currentValue

        if (value != '.') {
            currentValue = Number(currentValue)
        }
        console.log(currentValue)
    } else if (value == 'clear' || value == 'c') {
        operators["clear"]()
    } else if (value == '+/-' || value == '%' || value == '=') {
        console.log(`VALUE: ${value}`)
        calculate(value)
    } else {
        // If button clicked was an operator
        currentOperator = value
        console.log(`Current value: ${currentValue}, Old Value: ${oldValue}`)
        if (currentValue != null && oldValue != null) {
            console.log(`currentOperator: ${currentOperator}`)
            calculate(currentOperator)
        } else if (currentValue && oldValue == null) {
            oldValue = currentValue
            currentValue = null
        } else if (currentValue == null && oldValue != null) {

        }
        
        console.log(`Current value: ${currentValue}, Old Value: ${oldValue}`)
    }
}

for (let button of buttons) {
    button.addEventListener('click', handleButtonClick)
}

window.addEventListener('keydown', function (e) {
    console.log(e.key)
    if (POSSIBLE_KEYS.includes(e.key)) {
        let value = e.key
        handleSubmit(value)
    } else if (e.key == 'Enter') {
        handleSubmit('=')
    } else if (e.key == 'Backspace') {
        if (currentValue != null) {
            let str = String(currentValue)
            currentValue = str.substring(0, str.length - 1)
            resultElem.value = String(currentValue)
            currentValue = Number(currentValue)
        }
        console.log(oldValue, currentValue)
    }

  }, false);