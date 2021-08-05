const addButton = document.querySelector('.add')
const minusButton = document.querySelector('.subtract')
const multiplyButton = document.querySelector('.multiply')
const divideButton = document.querySelector('.divide')
const buttons = document.getElementsByTagName('button')
const POSSIBLE_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '=']
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

const calculate = () => {
    if (oldValue != null && currentValue != null) {
        currentValue = operate(currentOperator, oldValue, currentValue)
        oldValue = currentValue
        resultElem.value = String(oldValue)
        currentValue = null
    }
}

const clear = () => {
    resultElem.value = '0'
    currentValue = 0
    oldValue = null
}

const plusMinus = (num) => {
    currentValue = -1 * num
    resultElem.value = String(currentValue)
}

const onePercentOfNum = (num) => {
    currentValue = 0.01 * num
    resultElem.value = String(currentValue)
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
}

const operate = (operator, num1, num2) => {
    console.log(operator)
    return operators[operator](num1, num2)
}

const handleButtonClick = (event) => {
    const value = event.target.value
    console.log(value)
    handleSubmit(value)
    
}

const handleSubmit = (value) => {

    if (!isNaN(value) || value == '.') {
        console.log(`Number: ${currentValue}`)
        if (Number(currentValue) == 0) {
            currentValue = String(value)
        } else {
            currentValue = String(currentValue) + String(value)
        }
        
        resultElem.value = currentValue
        currentValue = Number(currentValue)
        console.log(currentValue)
    } else if (value == "clear") {
        operators["clear"]()
    } else if (value == '+/-' || value == '%') {
        operators[value](currentValue)
    } else if (value == '='){
        calculate()
    } else {
        // If button clicked was an operator
        currentOperator = value
        console.log(`Current value: ${currentValue}, Old Value: ${oldValue}`)
        if (currentValue != null && oldValue != null) {
            currentOperator = value
            calculate()
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
    addButton.click()
    console.log(e.key)
    if (POSSIBLE_KEYS.includes(e.key)) {
        console.log(`Valid ${e.key}`);
        let value = e.key
        handleSubmit(value)
    } else if (e.key == 'Enter') {
        handleSubmit('=')
    }

  }, false);