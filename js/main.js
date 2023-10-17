import Menu from './menu.js';
import { levels } from './levels.js';
import Game from './game.js';

let menu;
let game;
const playerData = loadPlayerData();
let selectedLevel = 0;

setupHelp();
startMenu();
// startGame(0, 0);

function loadPlayerData() {
	// localStorage.removeItem('z1-playerdata');
	const result = JSON.parse(localStorage.getItem('z1-playerdata')) || [];
	while (result.length < levels.length) {
		result.push([{pass: false, program: ''}, {pass: false, program: ''}, {pass: false, program: ''}]);
	}
	return result;
}

function startMenu() {
	menu = new Menu(playerData, levels, selectedLevel);
	for (let i = 0; i < 3; i++) {
		document.querySelector(`#edit-btn${i}`).addEventListener('click', () => {
			const levelIdx = menu.selectedLevel;
			const programIdx = i;
			selectedLevel = menu.removeFromDOM();
			menu = null;
			startGame(levelIdx, programIdx);
		});
		document.querySelector(`#del-btn${i}`).addEventListener('click', () => {
			document.querySelector(`#delete-confirm${i}`).classList.toggle('show');
		});
		document.querySelector(`#cancel-btn${i}`).addEventListener('click', () => {
			document.querySelector(`#delete-confirm${i}`).classList.remove('show');
		});
		document.querySelector(`#del-confirm-btn${i}`).addEventListener('click', () => {
			playerData[menu.selectedLevel][i].pass = false;
			playerData[menu.selectedLevel][i].program = '';
			document.querySelector(`#delete-confirm${i}`).classList.remove('show');
			menu.selectLevel(menu.selectedLevel);
			if (playerData[menu.selectedLevel].some(data => data.pass)) {
				document.querySelector(`#lvl${menu.selectedLevel} .checkbox`).classList.add('checked');
			} else {
				document.querySelector(`#lvl${menu.selectedLevel} .checkbox`).classList.remove('checked');
			}
			localStorage.setItem('z1-playerdata', JSON.stringify(playerData));
		});
	}
}

function startGame(levelIdx, programIdx) {
	game = new Game(playerData, levelIdx, programIdx);
	document.querySelector('#menu-btn').addEventListener('click', () => {
		game.removeFromDOM();
		startMenu();
	});
	game.startLevel();
}

function setupHelp() {
	document.querySelector('#help-ok-button').addEventListener('click', onHelpOKClick);
	document.querySelectorAll('#tabs-wrapper .tab').forEach((tab, idx) => {
		tab.addEventListener('click', () => onTabClick(idx));
	});
}

function onHelpOKClick() {
	document.querySelector('#help-wrapper').classList.remove('show');
}

function onTabClick(idx) {
	const currentTab = document.querySelector('.tab.selected');
	if (currentTab.id === `tab${idx}`) {
		return;
	}
	currentTab.classList.remove('selected');
	document.querySelector('.text.selected').classList.remove('selected');
	document.querySelector(`#tab${idx}`).classList.add('selected');
	document.querySelector(`#text${idx}`).classList.add('selected');
}