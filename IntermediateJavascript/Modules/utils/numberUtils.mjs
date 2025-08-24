
//This is export location one
// Numeric utility functions



export function divide(a, b) {
	if (b === 0) throw new Error('Division by zero');
	return a / b;
}

// NumberUtils class for demonstration
export class NumberUtils {
	// constructor(number) {
	// 	this.number = number;
	// }
    constructor(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }

	isEven() {
		return this.number % 2 === 0;
	}

	isOdd() {
		return this.number % 2 !== 0;
	}

	double() {
		return this.number * 2;
	}
    add(a, b) {
	return a + b;
    }
    subtract(a, b) {
	return a - b;
    }
    multiply(a, b) {
	return a * b;
    }

}



