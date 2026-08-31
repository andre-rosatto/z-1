class Level1 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Read the input data and output the same value.';
		for (let i = 0; i < 50; i++) {
			this.inputs.push(Math.floor(Math.random() * 512 - 256));
			this.targets.push(this.inputs[i]);
		}
	}
}

class Level2 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Read the input data, negate it, and output the value.';
		for (let i = 0; i < 50; i++) {
			this.inputs.push(Math.floor(Math.random() * 512 - 256));
			this.targets.push(-this.inputs[i]);
		}
	}
}

class Level3 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Read the input data, double it, and output the value.';
		for (let i = 0; i < 50; i++) {
			this.inputs.push(Math.floor(Math.random() * 512 - 256));
			this.targets.push(this.inputs[i] * 2);
		}
	}
}

class Level4 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Read the input data and output the absolute value.';
		for (let i = 0; i < 50; i++) {
			this.inputs.push(Math.floor(Math.random() * 512 - 256));
			this.targets.push(Math.abs(this.inputs[i]));
		}
	}
}

class Level5 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Read the input data and output its negative value.';
		for (let i = 0; i < 50; i++) {
			this.inputs.push(Math.floor(Math.random() * 512 - 256));
			this.targets.push(-Math.abs(this.inputs[i]));
		}
	}
}

class Level6 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Read the input data and only output values that are not zero.';
		const chanceOfZero = 0.25;
		for (let i = 0; i < 50; i++) {
			const value = Math.random() >= chanceOfZero ? Math.floor(Math.random() * 512 - 256) : 0;
			this.inputs.push(value);
			if (value !== 0) {
				this.targets.push(value);
			}
		}
	}
}

class Level7 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Output "5" 10 times. Then output "4" 10 times.';
		for (let i = 0; i < 10; i++) {
			this.targets.push(5);
		}
		for (let i = 0; i < 10; i++) {
			this.targets.push(4);
		}
	}
}

class Level8 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Read the input data. Output it if it is zero. Output "1" if it is greater than zero. Output "-1" if it is less than zero.';
		const chanceOfZero = 0.25;
		for (let i = 0; i < 50; i++) {
			const value = Math.random() >= chanceOfZero ? Math.floor(Math.random() * 512 - 256) : 0;
			this.inputs.push(value);
			this.targets.push(value === 0 ? 0 : Math.sign(value));
		}
	}
}

class Level9 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Output the input data multiplied by 3.';
		for (let i = 0; i < 50; i++) {
			const value = Math.floor(Math.random() * 512 - 256);
			this.inputs.push(value);
			this.targets.push(value * 3);
		}
	}
}

class Level10 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Subtract 10 from the input data.';
		for (let i = 0; i < 50; i++) {
			const value = Math.floor(Math.random() * 512 - 256);
			this.inputs.push(value);
			this.targets.push(value - 10);
		}
	}
}

class Level11 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Numbers will come in a sequence. When the input is zero, output the first number in the sequence.';
		let op = null;
		let chanceOfZero = 0;
		for (let i = 0; i < 49; i++) {
			const value = Math.random() >= chanceOfZero ? Math.floor(Math.random() * 255) + 1 : 0;
			this.inputs.push(value);
			chanceOfZero += 0.1;
			if (!op) {
				op = value;
			}
			if (value === 0) {
				this.targets.push(op);
				chanceOfZero = 0;
				op = null;
			}
		}
		if (this.inputs[this.inputs.length - 1] !== 0) {
			this.inputs.push(0);
		}
	}
}

class Level12 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Output the sum of the input values.';
		let sum = 0;
		for (let i = 0; i < 50; i++) {
			const value = Math.floor(Math.random() * 10 - 5);
			this.inputs.push(value);
			sum += value;
			this.targets.push(sum);
		}
	}
}

class Level13 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Output the subtraction of the input values.';
		let sub = 0;
		for (let i = 0; i < 50; i++) {
			const value = Math.floor(Math.random() * 10 - 5);
			this.inputs.push(value);
			sub -= value;
			this.targets.push(sub);
		}
	}
}

class Level14 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Output "1" if the input is less than 10, "2" if it is less than 20, and "3" otherwise.';
		for (let i = 0; i < 50; i++) {
			const value = Math.floor(Math.random() * 30);
			this.inputs.push(value);
			if (value < 10) {
				this.targets.push(1);
			} else if (value < 20) {
				this.targets.push(2);
			} else {
				this.targets.push(3);
			}				
		}
	}
}

class Level15 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Output all the numbers from the input number to 0.';
		for (let i = 0; i < 15; i++) {
			const value = Math.floor(Math.random() * 9 + 1);
			this.inputs.push(value);
			for (let i = value; i >= 0; i--) {
				this.targets.push(i);
			}
		}
	}
}

class Level16 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Output all the numbers from 0 to the input number.';
		for (let i = 0; i < 15; i++) {
			const value = Math.floor(Math.random() * 9 + 1);
			this.inputs.push(value);
			for (let i = 0; i <= value; i++) {
				this.targets.push(i);
			}
		}
	}
}

class Level17 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Read two numbers. Output "-1" if the first is lower, "1" if it is higher, and "0" if they are the same.';
		const chanceOfSame = 0.5;
		for (let i = 0; i < 25; i++) {
			const value1 = Math.floor(Math.random() * 512 - 216);
			const value2 = Math.random() > chanceOfSame ? Math.floor(Math.random() * 512 - 216) : value1;
			this.inputs.push(value1, value2);
			if (value1 < value2) {
				this.targets.push(-1);
			} else if (value1 > value2) {
				this.targets.push(1);
			} else {
				this.targets.push(0);
			}
		}
	}
}

class Level18 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Output the input data divided by 2.';
		for (let i = 0; i < 15; i++) {
			const value = Math.floor(Math.random() * 10 + 1);
			this.inputs.push(value * 2);
			this.targets.push(value);
		}
	}
}

class Level19 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Input data come in pairs. Output their product. The second number is always greater than zero.';
		for (let i = 0; i < 25; i++) {
			const value1 = Math.floor(Math.random() * 128 - 64);
			const value2 = Math.floor(Math.random() * 4 + 1);
			this.inputs.push(value1, value2);
			this.targets.push(value1 * value2);
		}
	}
}

class Level20 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Output "1" if the input is between 10 and 20, inclusive. Output "0" otherwise.';
		for (let i = 0; i < 50; i++) {
			const value = Math.floor(Math.random() * 40 - 20);
			this.inputs.push(value);
			this.targets.push(Number(value >= 10 && value <= 20));
		}
	}
}

class Level21 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Create the first 25 numbers of the Fibonacci sequence (each number is the sum of the two previous ones).';
		this.targets.push(0, 1);
		for (let i = 0; i < 25; i++) {
			const value = this.targets[this.targets.length - 2] + this.targets[this.targets.length - 1];
			this.targets.push(value);
		}
	}
}

class Level22 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Output the square of the input numbers.';
		for (let i = 0; i < 25; i++) {
			const value = Math.floor(Math.random() * 6);
			this.inputs.push(value);
			this.targets.push(value * value);
		}
	}
}

class Level23 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Output numbers from -3 to 3, then from 3 to -3. Do it three times.';
		for (let j = 0; j < 3; j++) {
			for (let i = -3; i <= 3; i++) {
				this.targets.push(i);
			}
			for (let i = 3; i >= -3; i--) {
				this.targets.push(i);
			}
		}
	}
}

class Level24 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Read the input data and add 1, then subtract 2, then add 3, then subtract 4, and so on.';
		let mult = 1;
		for (let i = 0; i < 50; i++) {
			const value = Math.floor(Math.random() * 256);
			this.inputs.push(value);
			this.targets.push(value + ((i + 1) * mult));
			mult *= -1;
		}
	}
}

class Level25 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Read the input data. Output it only if it is different from the previous one.';
		const chanceSame = 0.25;
		for (let i = 0; i < 50; i++) {
			if (i === 0 || Math.random() > chanceSame) {
				const value = Math.floor(Math.random() * 512 - 256);
				this.inputs.push(value);
				this.targets.push(value);
			} else {
				this.inputs.push(this.inputs[i - 1]);
			}
		}
	}
}

class Level26 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Add 5 to the input value if it is greater than 5. Subtract 5 if it is lower than -5. Output the same value otherwise.';
		for (let i = 0; i < 50; i++) {
			const value = Math.floor(Math.random() * 50 - 25);
			this.inputs.push(value);
			if (value < -5) {
				this.targets.push(value - 5);
			} else if (value > 5) {
				this.targets.push(value + 5);
			} else {
				this.targets.push(value);
			}
		}
	}
}

class Level27 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Add the input numbers. If the input is 0, subtract the previous number instead of adding it, and output the result.';
		let chanceOfZero = -0.1;
		let result = 0;
		let lastValue = 0;
		let i = 50;
		do {
			i--;
			const value = Math.random() < chanceOfZero ? 0 : Math.floor(Math.random() * 50 + 1);
			this.inputs.push(value);
			if (value === 0) {
				result -= lastValue * 2;
				this.targets.push(result);
				result = 0;
				chanceOfZero = -0.1
			}  else {
				result += value;
				chanceOfZero += 0.1;
				if (i === 0) {
					i++;
				}
			}
			lastValue = value;
		} while (i > 0);
	}
}

class Level28 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Read the input numbers and output the last digit only.';
		for (let i = 0; i < 50; i++) {
			const value = Math.floor(Math.random() * 100);
			this.inputs.push(value)
			const stringVal = String(value);
			this.targets.push(Number(stringVal[stringVal.length - 1]));
		}
	}
}

class Level29 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Input numbers are from 11 to 19. Output the digits inverted.';
		for (let i = 0; i < 10; i++) {
			const value = Math.floor(Math.random() * 9 + 11);
			this.inputs.push(value);
			const stringVal = String(value);
			this.targets.push(Number(stringVal[1] + stringVal[0]));
		}
	}
}

class Level30 {
	constructor() {
		this.inputs = [];
		this.targets = [];
		this.instructions = 'Read the input numbers and output the first digit only.';
		for (let i = 0; i < 50; i++) {
			const value = Math.floor(Math.random() * 50);
			this.inputs.push(value)
			const stringVal = String(value);
			this.targets.push(Number(stringVal[0]));
		}
	}
}

export const levels = [
	 Level1,  Level2,  Level3,  Level4,  Level5,  Level6,  Level7,  Level8,  Level9, Level10,
	Level11, Level12, Level13, Level14, Level15, Level16, Level17, Level18, Level19, Level20,
	Level21, Level22, Level23, Level24, Level25, Level26, Level27, Level28, Level29, Level30
];