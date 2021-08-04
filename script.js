const addButton = document.querySelector('.add')
const minusButton = document.querySelector('.subtract')
const multiplyButton = document.querySelector('.multiply')
const divideButton = document.querySelector('.divide')
const buttons = document.getElementsByTagName('button')
let resultElem = document.querySelector('.calculator-screen')
let currentValue = Number(resultElem.value)
let oldValue = null
let currentOperator = ''

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
    "equal": calculate,
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
    if (!isNaN(value)) {
        currentValue = String(currentValue) + String(value)
        resultElem.value = currentValue
        currentValue = Number(currentValue)
        console.log(currentValue)
    } else if (value == "clear") {
        operators["clear"]()
    } else if (value == '+/-' || value == '%') {
        operators[value](currentValue)
    } else {
        // If button clicked was an operator
        currentOperator = value
        console.log(`Current value: ${currentValue}, Old Value: ${oldValue}`)
        if (currentValue != null && oldValue != null) {
            let operator = value

            currentValue = operate(operator, oldValue, currentValue)
            resultElem.value = String(currentValue)
        } else if (currentValue && oldValue == null) {
            oldValue = currentValue
            currentValue = null
        }
        
        console.log(`Current value: ${currentValue}, Old Value: ${oldValue}`)
    }
}

for (let button of buttons) {
    button.addEventListener('click', handleButtonClick)
}
