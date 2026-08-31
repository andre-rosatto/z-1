import Parser from "./parser.js";

export default class Program {
	constructor(data, memory) {
		this.data = data;
		this.memory = memory;
		this.parser = null;
		this.codeDiv = document.querySelector('#code-area');
		this.errorDiv = document.querySelector('#errors');
		this.codeDiv = document.querySelector('#code-area');
		this.codeDiv.addEventListener('parserOut', () => {this.onParserOut()});
	}

	runNextLine() {
		if (!this.parser) {
			this.parser = new Parser(this.data, this.memory);
			this.codeDiv.contentEditable = false;
			if (this.parser.error) {
				this.showError();
				return false;
			}
		}
		this.parser.parseLine();
		if (this.parser.error) {
			this.showError();
			return false;
		}
		return true;
	}

	showError() {
		this.errorDiv.innerHTML = this.parser.error.message;
		this.codeDiv.querySelector(`#code${this.parser.error.lineNumber}`).className = 'error-line';
	}

	stop() {
		if (!this.parser) {
			return;
		}
		this.codeDiv.innerHTML = '';
		this.parser.codeLines.forEach((line, idx) => {
			this.codeDiv.innerHTML += idx > 0 ? `\n${line.divCode}` : line.divCode;
		});
		this.parser = null;
		this.codeDiv.childNodes.forEach(child => {
			child.className = '';
		});
		this.data.resetData();
		this.memory.resetRegisters();
		this.codeDiv.contentEditable = true;
	}

	onParserOut() {
		if (this.data.outputs.length >= this.data.targets.length) {
			this.codeDiv.dispatchEvent(new Event('programOutputFinished'));
		}
	}
}