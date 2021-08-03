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

const operators = {
    "add": add,
    "subtract": subtract,
    "multiply": multiply,
    "divide": divide,
}

const operate = (operator, num1, num2) => {
    return operators[operator](num1, num2)
}

console.log(operate("multiply", 50, 50))
