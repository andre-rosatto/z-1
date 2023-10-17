import { levels } from './levels.js';

export default class Menu {
	constructor(playerData, levels, selectedLevel) {
		this.playerData = playerData;
		this.levels = levels;
		this.selectedLevel = selectedLevel;
		const template = document.querySelector('#menu-template').content.cloneNode(true);
		document.body.appendChild(template);
		this.addLevels();
		this.selectLevel(this.selectedLevel);
		document.querySelector('#menu-help-button').addEventListener('click', () => {
			document.querySelector('#help-wrapper').classList.add('show');
		});
	}

	addLevels() {
		for (let i = 0; i < this.levels.length; i++) {
			const template = document.querySelector('#level-template').content.cloneNode(true);
			template.querySelector('.level').id = `lvl${i}`;
			template.querySelector('.level p').textContent = `level ${i + 1}`;
			if (this.playerData[i].some(data => data.pass)) {
				template.querySelector('.level .checkbox').classList.add('checked');
			}
			template.querySelector(`#lvl${i}`).addEventListener('click', () => {
				this.selectLevel(i);
			});
			document.querySelector('#levels-wrapper').appendChild(template);
		}
	}

	selectLevel(levelNumber) {
		document.querySelector(`#lvl${this.selectedLevel}`).classList.remove('selected');
		this.selectedLevel = levelNumber;
		document.querySelector(`#lvl${this.selectedLevel}`).classList.add('selected');
		const level = new levels[levelNumber]();
		document.querySelector('#instructions-text').textContent = level.instructions;
		this.playerData[levelNumber].forEach((prg, idx) => {
			if (prg.pass) {
				document.querySelector(`#checkbox${idx}`).classList.add('checked');
			} else {
				document.querySelector(`#checkbox${idx}`).classList.remove('checked');
			}
			document.querySelector(`#prg${idx}`).textContent = prg.program;
		});
	}

	showDeleteConfirm(prgIdx) {
		document.querySelector(`#deleteConfirm${i}`).classList.add('show');
	}

	removeFromDOM() {
		document.querySelector('#menu-wrapper').remove();
		return this.selectedLevel;
	}
}