export default class Memory {
	constructor() {
		this.acc = 0;
		this.registers = [];
		this.registersDiv = [];
		for (let i = 0; i < document.querySelectorAll('.register').length; i++) {
			this.registers.push(0);
			this.registersDiv.push(document.querySelector(`#register${i}`));
		}
		this.resetRegisters();
	}

	resetRegisters() {
		for (let i = 0; i < this.registers.length; i++) {
			this.setRegister(i, 0);
		}
	}

	getRegisterIndex(register) {
		if (register.length === 1) {
			register = register.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
		} else {
			return -1;
		}
		if (register < 0 || register >= this.registers.length) {
			return -1;
		}
		return register;
	}

	setRegister(register, value) {
		if (isNaN(register)) {
			register = this.getRegisterIndex(register);
			if (register < 0) {
				return false;
			}
		}
		this.registers[register] = value;
		this.registersDiv[register].innerHTML = value;
		return true;
	}

	getRegisterValue(register) {
		if (isNaN(register)) {
			register = this.getRegisterIndex(register);
			if (register < 0) {
				return null;
			}
		}
		return this.registers[register];
	}
}