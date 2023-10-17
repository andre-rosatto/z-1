export default class Parser {
	constructor(data, memory) {
		this.data = data;
		this.memory = memory;
		this.curLine = 0;
		this.codeLines = [];
		this.error = null;
		this.codeDiv = document.querySelector('#code-area');
		this.commands = [
			{name: 'IN', params: 1, func: this.IN},
			{name: 'OUT', params: 1, func: this.OUT},
			{name: 'NEG', params: 1, func: this.NEG},
			{name: 'LD', params: 2, func: this.LD},
			{name: 'ADD', params: 2, func: this.ADD},
			// {name: 'SUB', params: 2, func: this.SUB},
			{name: 'SAV', params: 2, func: this.SAV},
			{name: 'JP', params: 2, func: this.JP},
			{name: 'JPZ', params: 2, func: this.JPZ},
			{name: 'JPN', params: 2, func: this.JPN},
			{name: 'JPG', params: 2, func: this.JPG},
			{name: 'JPL', params: 2, func: this.JPL}
		];
		this.errors = new Map([
			['invalidLabel', 'Invalid label.'],
			['labelDefined', 'Label already defined.'],
			['unknownCommand', 'Unknown command: "#".'],
			['parametersNumber', 'Wrong number of parameters.'],
			['noData', 'Out of input data.'],
			['invalidInteger', 'Invalid integer: "#".'],
			['invalidRegister', 'Invalid register: "#".'],
			['unknownLabel', 'Unknown label: "#".'],
		]);
		this.formatCode();
		if (!this.getLabels()) {
			return false;
		}
		return true;
	}

	formatCode() {
		this.codeDiv.textContent.split('\n').forEach(line => {
			let cleanLine = line.toUpperCase().replace(/\t/g, ' ').trim();
			if (!cleanLine) {
				cleanLine = null;
			}
			this.codeLines.push({code: cleanLine, divCode: line});
		});
		this.codeDiv.innerHTML = '';
		this.codeLines.forEach((line, idx) => {
			this.codeDiv.innerHTML += `<span id="code${idx}">${line.divCode}\n</span>`;
		});
	}

	getLabels() {
		this.labels = [];
		for (let i = 0; i < this.codeLines.length; i++) {
			if (!this.codeLines[i].code?.includes(':')) {
				continue;
			}
			const parts = [...this.codeLines[i].code.split(/\s|:/).filter(el => el)];
			if (parts.length !== 1) {
				this.error = {message: this.errors.get('invalidLabel'), lineNumber: i};
				return false;
			}
			const label = parts[0].toUpperCase();
			if (this.labels.some(l => l.name === label)) {
				this.error = {message: this.errors.get('labelDefined'), lineNumber: i};
				return false;
			}
			this.labels.push({name: label, lineNumber: i});
		}
		return true;
	}

	parseLine() {
		this.error = null;
		if (!this.codeLines.some(el => el.code)) {
			return;
		}
		if (this.curLine >= this.codeLines.length) {
			this.curLine = 0;
		}
		if (!this.codeLines[this.curLine].code) {
			this.curLine++;
			this.parseLine();
			return;
		}
		if (this.labels.some(l => l.lineNumber === this.curLine)) {
			this.curLine++;
			this.parseLine();
			return;
		}
		let params = this.codeLines[this.curLine].code.split(' ');
		for (let i = 0; i < params.length; i++) {
			params[i] = params[i].trim();
		}
		if (!this.commands.some(c => c.name === params[0]))
		{
			this.error = {message: this.errors.get('unknownCommand').replace('#', params[0]), lineNumber: this.curLine};
			return;
		}
		this.codeDiv.querySelectorAll('.selected-line').forEach(el => {
			el.className = '';
		});
		const codeLineDiv = this.codeDiv.querySelector(`#code${this.curLine}`);
		const codeAreaDiv = document.querySelector('#program-wrapper');
		codeLineDiv.className = 'selected-line';
		if (codeLineDiv.getBoundingClientRect().bottom > codeAreaDiv.getBoundingClientRect().bottom ||
			codeLineDiv.getBoundingClientRect().top < codeAreaDiv.getBoundingClientRect().top) {
				codeLineDiv.scrollIntoView();
			}
		// this.codeDiv.querySelector(`#code${this.curLine}`).className = 'selected-line';
		
		const command = this.commands.find(c => c.name === params[0]);
		if (command.params !== params.length) {
			this.error = {message: this.errors.get('parametersNumber'), lineNumber: this.curLine};
			return;
		}
		command.func.call(this, params);
	}

	IN() {
		const val = this.data.getInput();
		if (val === null) {
			this.error = {message: this.errors.get('noData'), lineNumber: this.curLine};
			return;
		}
		this.memory.setRegister(0, val);
		this.curLine++;
	}
	
	OUT() {
		this.data.outValue();
		this.curLine++;
		this.codeDiv.dispatchEvent(new Event('parserOut'));
	}

	NEG() {
		this.memory.setRegister(0, -this.memory.registers[0]);
		this.curLine++;
	}

	LD(params) {
		let value = Number(params[1]);
		if (isNaN(value)) {
			this.error = {message: this.errors.get('invalidInteger').replace('#', params[1]), lineNumber: this.curLine};
			return;
		}
		this.memory.setRegister(0, value);
		this.curLine++;
	}
	
	ADD(params) {
		let regIdx = this.memory.getRegisterIndex(params[1]);
		if (regIdx === -1) {
			this.error = {message: this.errors.get('invalidRegister').replace('#', params[1]), lineNumber: this.curLine};
			return;
		}
		this.memory.setRegister(0, this.memory.registers[0] + this.memory.getRegisterValue(regIdx));
		this.curLine++;
	}
	
	// SUB(params) {
	// 	let regIdx = this.memory.getRegisterIndex(params[1]);
	// 	if (regIdx === -1) {
	// 		this.error = {message: this.errors.get('invalidRegister').replace('#', params[1]), lineNumber: this.curLine};
	// 		return;
	// 	}
	// 	this.memory.setRegister(0, this.memory.registers[0] - this.memory.getRegisterValue(regIdx));
	// 	this.curLine++;
	// }

	SAV(params) {
		let regIdx = this.memory.getRegisterIndex(params[1]);
		if (regIdx === -1) {
			this.error = {message: this.errors.get('invalidRegister').replace('#', params[1]), lineNumber: this.curLine};
			return;
		}
		this.memory.setRegister(regIdx, this.memory.registers[0]);
		this.curLine++;
	}
	
	JP(params) {
		const label = this.labels.find(l => l.name === params[1]);
		if (!label) {
			this.error = {message: this.errors.get('unknownLabel').replace('#', params[1]), lineNumber: this.curLine};
			return;
		}
		this.curLine = label.lineNumber;
	}
	
	JPZ(params) {
		const label = this.labels.find(l => l.name === params[1]);
		if (!label) {
			this.error = {message: this.errors.get('unknownLabel').replace('#', params[1]), lineNumber: this.curLine};
			return;
		}
		this.curLine = this.memory.getRegisterValue(0) === 0 ? label.lineNumber : this.curLine + 1;
	}
	
	JPN(params) {
		const label = this.labels.find(l => l.name === params[1]);
		if (!label) {
			this.error = {message: this.errors.get('unknownLabel').replace('#', params[1]), lineNumber: this.curLine};
			return;
		}
		this.curLine = this.memory.getRegisterValue(0) !== 0 ? label.lineNumber : this.curLine + 1;
	}
	
	JPG(params) {
		const label = this.labels.find(l => l.name === params[1]);
		if (!label) {
			this.error = {message: this.errors.get('unknownLabel').replace('#', params[1]), lineNumber: this.curLine};
			return false;
		}
		this.curLine = this.memory.getRegisterValue(0) > 0 ? label.lineNumber : this.curLine + 1;
	}
	
	JPL(params) {
		const label = this.labels.find(l => l.name === params[1]);
		if (!label) {
			this.error = {message: this.errors.get('unknownLabel').replace('#', params[1]), lineNumber: this.curLine};
			return false;
		}
		this.curLine = this.memory.getRegisterValue(0) < 0 ? label.lineNumber : this.curLine + 1;
	}
}