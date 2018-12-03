function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return [].slice.call(document.querySelectorAll(selector));
}

function showModal(name) {
	hideModal();
	$('#modalContainer').classList.add('visible');

	$('.modal#' + name + '_modal').classList.add('visible');
}

function hideModal() {
	$$('#modalContainer .modal.visible').forEach(function(e) { e.classList.remove('visible')});
	$('#modalContainer').classList.remove('visible');
}

function show(el) {
	el.classList.remove('hidden');
}

function hide(el) {
	el.classList.add('hidden');
}

function setClass(text) {
	$('#class').textContent = text;
}

function setRace(text) {
	$('#race').textContent = text;
}

function setName(text) {
	$('#name').textContent = text;
}

function setAlignment(text) {
	$('#alignment').textContent = text;
}

function addEX(diff) {
	if($('#exBar').parentElement.classList.contains('hidden')) return;
	$('#exBar').value = Number($('#exBar').value) + diff;
	if (Number($('#exBar').value) >= 100) $('#level_up').classList.remove('hidden');
}
function addHP(diff) {
	$('#hpBar').value = Number($('#hpBar').value) + diff;
}
function addMP(diff) {
	$('#mpBar').value = Number($('#mpBar').value) + diff;
}
function addST(diff) {
	$('#stBar').value = Number($('#stBar').value) + diff;
}
function addDP(diff) {
	$('#dpBar').value = Number($('#dpBar').value) + diff;
}
function addIN(diff) {
	$('#inBar').value = Number($('#inBar').value) + diff;
}


var inventory = [];
var equippedItem;

function getItem(item) {
	$('.inventoryBox.' + item + ' img').classList.remove('hidden');
	$('.inventoryBox.' + item + ' select').classList.remove('hidden');
	inventory.push(item);
}

function removeItem(item) {
	$('.inventoryBox.' + item + ' img').classList.add('hidden');
	$('.inventoryBox.' + item + ' select').classList.add('hidden');
	inventory.splice(inventory.indexOf(item), 1);
}

function clickedAbilityScore(button) {
	//var abilityScoreEl = button.parentElement.parentElement;
	var abilityName = button.parentElement.parentElement.querySelector('b').textContent;

	hide($('#' + abilityName));
	showModal('no_' + abilityName);

	if(abilityName === 'STR') {
		hide($('#attack_button'));
		hide($('#defend_button'));
		hide($('#run_button'));
		hide($('#throw_button'));
		hide($('#jump_button'));
		hide($('#sit_button'));
	} else if (abilityName === 'DEX') {
		hide($('#attack_button'));
		hide($('#dance_button'));
		hide($('#defend_button'));
		hide($('#draw_button'));
		hide($('#drink_button'));
		hide($('#eat_button'));
		hide($('#run_button'));
		hide($('#jump_button'));
		hide($('#throw_button'));
	} else if (abilityName === 'INT') {
		hide($('#think_button'));
		hide($('#say_button'));
	} else if (abilityName === 'WIS') {
		hide($('#panic_button'));
		hide($('#look_button'));
		hide($('#pray_button'));
		hide($('#defend_button'));
	} else if (abilityName === 'CHA') {
		hide($('#smile_button'));
		hide($('#frown_button'));
		hide($('#pray_button'));
		hide($('#defend_button'));
	} 
}

function itemAction(selectElement) {
	var inventoryBox = selectElement.parentElement;
	var item = inventoryBox.classList[1];
	var action = selectElement.value;

	if (action === 'wear' || action === 'equip') {
		$('#player').setAttribute('src', 'SVG/p_' + item + '.svg');
		equippedItem = item;
	} else if (action === 'eat') {
		removeItem(item);
	} else if (action === 'pet' || action === 'scratch') {
		showModal('cat_error');
		removeItem(item);
		hide(inventoryBox);
	} else if (action === 'drop' || true) {
		removeItem(item);
		if (equippedItem === item) {
			$('#player').setAttribute('src', 'SVG/p.svg');
			equippedItem = null;
		}
	}

	selectElement.value = '';
}

var currentEnemy;
var enemies = {
	'skeleton': {
		'height': 300,
	},
	'spider': {
		'height': 200,
	},
	'earth_golem': {
		'height': 300,
	},
	'treasure': {
		'height': 150,
	},
	'goomba': {
		'height': 150,
	},
	'goblin': {
		'height': 200,
	},
	'doppelganger': {
		'height': 200,
	},
	'cultist': {
		'height': 200,
	}
}



function random(a, b) {
	return Math.floor(Math.random() * (b - a + 1) + a);
}

function doAction(action) {
	if(action === 'attack') {
		if (currentEnemy != null) {
			var possibleRewards = $$('.inventoryBox:not(.hidden) img.hidden').map(function(e) {
				return e.parentElement.classList[1];
			});
			var reward = possibleRewards[random(0, possibleRewards.length - 1)]
			$('.victory_modal_monster').textContent = currentEnemy.toUpperCase();
			$('.victory_modal_reward').textContent = reward.toUpperCase();
			getItem(reward);
			showModal('victory');

			currentEnemy = null;
			$('#enemy').setAttribute('src', '');
		} else {
			showModal('no_enemy');
			hide($('#attack_button'));
		}
		
	} else if (action === 'explore') {
		if (Math.random() < 0.6) {
			var enemyName = Object.keys(enemies)[random(0, Object.keys(enemies).length - 1)];

			currentEnemy = enemyName;
			$('#enemy').setAttribute('src', 'SVG/' + enemyName + '.svg');
			$('#enemy').setAttribute('height', enemies[enemyName].height);

			$('.monster_modal_monster').textContent = enemyName.toUpperCase();
			showModal('explore_monster');
		} else {
			showModal('explore_nothing');
		}
	} else if (action === 'smile') {
		addDP(10);
	} else if (action === 'frown') {
		addDP(-10);
	}else {
		hide($('#' + action + '_button'));
		$$('.action_modal_action').forEach(function(e) { e.textContent = action.toUpperCase(); });
		showModal('action');
		addEX(10);
	}
}

function showUI() {
	show($('#leftContainer'));
	show($('#middleContainer'));
	show($('#rightContainer'));
}

function hideUI() {
	hide($('#leftContainer'));
	hide($('#middleContainer'));
	hide($('#rightContainer'));
}


hideUI();
showModal('start');