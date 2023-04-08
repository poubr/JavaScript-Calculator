class Calculator {
    constructor(display) {
        this.display = display;
        this.previousOperand;
        this.currentOperand;
        this.operation;
        this.clear();
    }

    // Reset the values
    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    };

    // Delete the last character of the number as a string
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Formate number using regex (expression from SO)
    formatNumber(number) {
        return number.toString().replace(/\B(?<!\.\d)(?=(\d{3})+(?!\d))/g, " ")
    }

    // Update display; check if there is an operation in progress and if so,
    // concanetate the previous operand with the operation symbol
    updateDisplay() {
        if (this.operation === undefined) {
            this.display.innerHTML = this.formatNumber(this.currentOperand)
        } else {
            this.display.innerHTML = `${this.formatNumber(this.previousOperand)} ${this.operation} ${this.currentOperand}`;
        }
    }

    // Add new input to current operand and check decimal point is only added once
    addNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand + number;
    }

    // Check first if user already input the number; if not, stop.
    // If previous operand is not empty, call compute.
    // After the checks (and possible computation) reset the values.
    chooseOperation(operator) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let result;
        const x = parseFloat(this.previousOperand);
        const y = parseFloat(this.currentOperand);
        if (isNaN(x) || isNaN(y)) return;

        switch(this.operation) {
            case "+":
                result = x + y;
                break;
            case "-":
                result = x - y;
                break;
            case "*":
                result = x * y;
                break;
            case "÷":
                result = x / y;
                break;
            default:
                return;               
        }
        this.currentOperand = result;
        this.previousOperand = "";
        this.operation = undefined;  
    }
}

// Get hold of all the buttons and display, create calculator instance, add even listeners
const display = document.querySelector("[data-display]");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");

const calculator = new Calculator(display);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})
