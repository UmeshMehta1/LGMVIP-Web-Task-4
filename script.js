const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";
let firstOperand = "";

function clearDisplay() {
    display.value = "";
    currentInput = "";
    operator = "";
    firstOperand = "";
}

function updateDisplay() {
    display.value = currentInput;
}

function handleOperator(op) {
    if (currentInput === "") return;
    if (firstOperand === "") {
        firstOperand = currentInput;
        currentInput = "";
        operator = op;
    } else {
        currentInput = calculate(firstOperand, operator, currentInput);
        operator = op;
        firstOperand = currentInput;
        currentInput = "";
        updateDisplay();
    }
}

function calculate(a, op, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case "+":
            return (a + b).toString();
        case "-":
            return (a - b).toString();
        case "*":
            return (a * b).toString();
        case "/":
            if (b === 0) {
                alert("Error: Division by zero");
                clearDisplay();
                return "";
            }
            return (a / b).toString();
        default:
            return b;
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonValue = button.textContent;
        switch (button.className) {
            case "clear":
                clearDisplay();
                break;
            case "backspace":
                currentInput = currentInput.slice(0, -1);
                updateDisplay();
                break;
            case "equal":
                currentInput = calculate(firstOperand, operator, currentInput);
                operator = "";
                firstOperand = "";
                updateDisplay();
                break;
            case "operator":
                handleOperator(buttonValue);
                break;
            default:
                currentInput += buttonValue;
                updateDisplay();
                break;
        }
    });
});
