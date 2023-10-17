import Data from './data.js';
import Program from './program.js';
import Memory from './memory.js';
import { levels } from './levels.js';

const texts = {
	run: '>> run',
	pause: '>> pause'
};

export default class Game {
	constructor(playerData, levelIdx, programIdx) {
		this.playerData = playerData;
		this.levelIdx = levelIdx;
		this.programIdx = programIdx;
		const template = document.querySelector('#game-template').content.cloneNode(true);
		document.body.appendChild(template);
		this.data = null;
		this.program = null;
		this.memory = null;
		this.level = null;
		this.runTimer = null;
		this.programFinished = false;
		this.instructionsDiv = document.querySelector('#instructions');
		this.runDiv = document.querySelector('#run-btn');
		this.runDiv.addEventListener('click', () => {this.onRunClick()});
		this.stepDiv = document.querySelector('#step-btn');
		this.stepDiv.addEventListener('click', () => {this.onStepClick()});
		document.querySelector('#stop-btn').addEventListener('click', () => {this.onStopClick()});
		document.querySelector('#code-area').addEventListener('programOutputFinished', () => {this.onProgramOutputFinished()});
		document.querySelector('#help-btn').addEventListener('click', this.onHelpClick);
	}

	startLevel() {
		this.level = new levels[this.levelIdx]();
		this.memory = new Memory();
		this.data = new Data(this.level, this.memory);
		this.program = new Program(this.data, this.memory);
		this.instructionsDiv.innerHTML = this.level.instructions;
		this.programFinished = false;
		document.querySelector('#instructions-wrapper .label').innerHTML = `instructions: level ${this.levelIdx + 1}`;
		this.program.codeDiv.innerHTML = this.playerData[this.levelIdx][this.programIdx].program;
	}

	stopTimer() {
		clearInterval(this.runTimer);
		this.runTimer = null;
		this.runDiv.innerHTML = this.runTimer === null ? texts.run : texts.pause;
		this.programFinished = false;
	}

	enableButtons() {
		this.stepDiv.classList.remove('button-disabled');
		this.runDiv.classList.remove('button-disabled');
	}

	disableButtons() {
		this.stepDiv.classList.add('button-disabled');
		this.runDiv.classList.add('button-disabled');
	}

	saveProgram() {
		localStorage.setItem('z1-playerdata', JSON.stringify(this.playerData));
	}

	onStepClick() {
		if (this.programFinished) {
			return;
		}
		if (!this.program.parser) {
			this.playerData[this.levelIdx][this.programIdx].pass = false;
			this.playerData[this.levelIdx][this.programIdx].program = this.program.codeDiv.textContent;
			this.saveProgram();
		}
		this.stopTimer();
		this.program.runNextLine();
	}
	
	onRunClick() {
		if (this.programFinished) {
			return;
		}
		this.playerData[this.levelIdx][this.programIdx].pass = false;
		this.playerData[this.levelIdx][this.programIdx].program = this.program.codeDiv.textContent;
		this.saveProgram();
		if (!this.runTimer) {
			this.runDiv.innerHTML = texts.pause;
			this.runTimer = setInterval(() => {
				if (!this.program.runNextLine()) {
					this.stopTimer();
				};
			}, 50);
		} else {
			this.stopTimer();
		}
	}
	
	onStopClick() {
		this.stopTimer();
		this.program.stop();
		this.programFinished = false;
		this.enableButtons();
		document.querySelector('#errors').innerHTML = '';
	}

	onHelpClick() {
		document.querySelector('#help-wrapper').classList.add('show');
	}

	onProgramOutputFinished() {
		this.stopTimer();
		this.disableButtons();
		this.programFinished = true;
		if (this.data.checkWin()) {
			this.playerData[this.levelIdx][this.programIdx].pass = true;
			this.saveProgram();
		}
	}

	removeFromDOM() {
		document.querySelector('#game-big-wrapper').remove();
	}
}