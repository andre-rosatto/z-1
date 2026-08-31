export default class Data {
	constructor(level, memory) {
		this.memory = memory;
		this.inIndex = 0;
		this.outIndex = 0;
		this.inputs = level.inputs;
		this.targets = level.targets;
		this.outputs = [];
		this.inputDiv = document.querySelector('#input-values');
		this.targetDiv = document.querySelector('#target-values');
		this.outputDiv = document.querySelector('#output-values');
		this.resetDivs();
	}

	resetData() {
		this.inIndex = 0;
		this.outIndex = 0;
		this.outputs = [];
		this.resetDivs();
	}

	resetDivs() {
		this.inputDiv.innerHTML = '';
		this.targetDiv.innerHTML = '';
		this.outputDiv.innerHTML = '';
		this.inputs.forEach((input, idx) => {
			if (idx > 0) {
				this.inputDiv.innerHTML += '\n';
			}
			this.inputDiv.innerHTML += `<span id="input${idx}">${input}</span>`;
		});
		this.targets.forEach((target, idx) => {
			if (idx > 0) {
				this.targetDiv.innerHTML += '\n';
			}
			this.targetDiv.innerHTML += `<span id="target${idx}">${target}</span>`;
		});
		if (this.inputs.length > 0) {
			this.inputDiv.querySelector(`#input${this.inIndex}`).className = 'selected-line';
		}
		const firstInput = this.inputDiv.querySelector('#input0');
		if (firstInput) {
			firstInput.scrollIntoView();
		}
	}

	getInput() {
		if (this.inIndex >= this.inputs.length) {
			return null;
		}
		this.inputDiv.querySelector(`#input${this.inIndex}`).className = '';
		if (this.inIndex + 1 < this.inputs.length) {
			const inputLine = this.inputDiv.querySelector(`#input${this.inIndex + 1}`);
			const wrapperBottom = document.querySelector('#data-wrapper').getBoundingClientRect().bottom;
			inputLine.className = 'selected-line';
			if (inputLine.getBoundingClientRect().bottom > wrapperBottom) {
				inputLine.scrollIntoView();
			}
		}
		return this.inputs[this.inIndex++];
	}

	outValue() {
		if (this.outIndex > 0) {
			this.outputDiv.innerHTML += '\n';
		}
		const value = this.memory.registers[0];
		this.outputDiv.innerHTML += `<span id="output${this.outIndex}">${value}</span>`;
		if (value !== this.targets[this.outIndex]) {
			this.targetDiv.querySelector(`#target${this.outIndex}`).className = 'error-line';
			this.outputDiv.querySelector(`#output${this.outIndex}`).className = 'error-line';
		}
		this.outputs.push(value);
		this.outIndex++;
	}

	checkWin() {
		if (this.targets.length !== this.outputs.length) {
			return false;
		}
		for (let i = 0; i < this.targets.length; i++) {
			if (this.targets[i] !== this.outputs[i]) {
				return false;
			}
		}
		return true;
	}
}