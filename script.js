const addButton = document.querySelector('.add')
const minusButton = document.querySelector('.subtract')
const multiplyButton = document.querySelector('.multiply')
const divideButton = document.querySelector('.divide')
const buttons = document.getElementsByTagName('button')
let resultElem = document.querySelector('.calculator-screen')
let currentValue = Number(resultElem.value)
let oldValue = null

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

const clear = () => {
    resultElem.value = '0'
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
    "add": add,
    "subtract": subtract,
    "multiply": multiply,
    "divide": divide,
    "clear": clear,
    "+/-": plusMinus,
    "%": onePercentOfNum,
}

const operate = (operator, num1, num2) => {
    return operators[operator](num1, num2)
}

const handleButtonClick = (event) => {
    const value = event.target.value
    if (!isNaN(value)) {
        currentValue = String(currentValue) + String(value)
        resultElem.value = currentValue
        currentValue = Number(currentValue)
        console.log(currentValue)
    } else if (value == "clear") {
        operators["clear"]()
    } else {
        operators[value](currentValue)
    }
}

for (let button of buttons) {
    button.addEventListener('click', handleButtonClick)
}
console.log(operate("multiply", 50, 50))
console.log(currentValue)
