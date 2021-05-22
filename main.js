// App Initial State
const initApp = (response) => {
	instantiateWeapons(response);
	currWeapon = allWeapons[0];
	updateAmmo(currWeapon.capacity);
	updateWeaponTitle(currWeapon.name);
	updateWeapon(currWeapon.images.inActive);
	shootAll(); /* silently shoot all */
};

// AJAX requet
function getData() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', './resources/data/weapons.json', true);
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let response = this.responseText;
			initApp(response);
		}
	};

	xhr.onerror = function () {
		console.log(`Error: ${xhr.statusText}`);
	};
	xhr.send();
}

function instantiateWeapons(response) {
	let weapons = JSON.parse(response);
	weapons.forEach((weapon) => {
		let newWeapon = new Weapon(
			weapon.name,
			weapon.capacity,
			weapon.ammo,
			weapon.fire_rate,
			weapon.images.static,
			weapon.images.active,
			weapon.audio.shoot,
			weapon.audio.reload,
			weapon.audio.draw
		);
		allWeapons.push(newWeapon);
	});
}

const allWeapons = [];

// Weapons Object
class Weapon {
	constructor(name, capacity, ammo, firerate, inActive, active, shoot, reload, draw) {
		this.name = name;
		this.capacity = capacity;
		this.ammo = ammo;
		this.firerate = firerate * 2; /* time in ms between each shot */
		this.images = {
			inActive: inActive,
			active: active,
		};
		this.audio = {
			shoot: shoot,
			reload: reload,
			draw: draw,
		};
	}
	shoot(volume) {
		let fireSound = new Audio(this.audio.shoot);
		fireSound.play();
		fireSound.volume = volume;
	}
	reload(volume) {
		let reloadSound = new Audio(this.audio.reload);
		reloadSound.play();
		reloadSound.volume = volume;
	}
	draw(volume) {
		let drawSound = new Audio(this.audio.draw);
		drawSound.play();
		drawSound.volume = volume;
	}
	preloadData() {
		let fireSound = new Audio();
		fireSound.src = this.audio.shoot;
		let reloadSound = new Audio();
		reloadSound.src = this.audio.reload;
		let drawSound = new Audio();
		drawSound.src = this.audio.draw;
		let imgInactive = new Image();
		imgInactive.src = this.images.inActive;
		let imgActive = new Image();
		imgActive.src = this.images.active;
	}
}

// Variables
const leftBtn = document.querySelector('.select-left');
const rightBtn = document.querySelector('.select-right');
const singleBtn = document.querySelector('.single');
const multiBtn = document.querySelector('.multiple');
const reloadBtn = document.querySelector('.reload');
const output = document.getElementById('output');
const weaponContainer = document.querySelector('.weapon-wrapper img');
let currWeapon;
let index = 0;
let isShooting = false;

// Event Listeners
leftBtn.addEventListener('click', selectLeft);
rightBtn.addEventListener('click', selectRight);
singleBtn.addEventListener('click', shootOne);
multiBtn.addEventListener('click', shootMulti);
reloadBtn.addEventListener('click', reload);
window.addEventListener('load', getData);

// Select Current Weapon
function selectLeft() {
	if (!isShooting) {
		shootAll();
		index > 0 ? index-- : (index = allWeapons.length - 1);
		currWeapon = allWeapons[index];
		updateUI(currWeapon);
	} else {
		toggleShake(leftBtn);
	}
}

function selectRight() {
	if (!isShooting) {
		shootAll();
		index < allWeapons.length - 1 ? index++ : (index = 0);
		currWeapon = allWeapons[index];
		updateUI(currWeapon);
	} else {
		toggleShake(rightBtn);
	}
}

// Selector Logic
function updateUI(currWeapon) {
	updateWeapon(currWeapon.images.inActive);
	updateMultiBtn();
	toggleClass(weaponContainer, 'select-weapon'); /* draw animation */
	updateWeaponTitle(currWeapon.name);
	updateAmmo(currWeapon.ammo);
	currWeapon.draw(0.1);
	setTimeout(() => toggleClass(weaponContainer, 'select-weapon'), 300);
}

// Shooting Logic
function shoot(shots) {
	let ammo = shots;
	for (let i = 0; i < shots; i++) {
		setTimeout(() => {
			currWeapon.ammo--;
			ammo--;
			updateAmmo(currWeapon.ammo);
			updateWeapon(currWeapon.images.active); // sets img src value (shooting)
			toggleClass(weaponContainer, 'shooting');
			shootWeapon();
			ammo == 0 ? (isShooting = false) : (isShooting = true);
		}, i * currWeapon.firerate);
	}
}

// Shoot Once
function shootOne() {
	let ammo = currWeapon.ammo;
	ammo <= 0 && toggleNoAmmo();
	!isShooting && ammo != 0 ? shoot(1) : toggleShake(singleBtn);
}

// Shoot Multiple Times
function shootMulti() {
	let ammo = currWeapon.ammo > 10 ? 10 : currWeapon.ammo;
	ammo <= 0 && (toggleShake(multiBtn), toggleNoAmmo());
	!isShooting ? shoot(ammo) : toggleShake(multiBtn);
}

// Reload Weapon Function
function reload() {
	if (!isShooting) {
		currWeapon.ammo = currWeapon.capacity;
		updateAmmo(currWeapon.ammo);
		output.classList.toggle('ammo-reloaded');
		currWeapon.reload(0.1);
		setTimeout(() => output.classList.toggle('ammo-reloaded'), 200);
	} else {
		toggleShake(reloadBtn);
	}
}

function shootWeapon() {
	let delayTime = currWeapon.firerate < 100 ? currWeapon.firerate - 50 : 100;
	setTimeout(() => {
		updateWeapon(currWeapon.images.inActive);
		toggleClass(weaponContainer, 'shooting');
		currWeapon.shoot(0.05);
	}, delayTime);
}

function updateWeapon(weapon) {
	weaponContainer.setAttribute('src', weapon);
}

function updateWeaponTitle(newTitle) {
	let weaponTitle = document.querySelector('.weapon-title');
	weaponTitle.innerHTML = newTitle;
}

function updateAmmo(ammo) {
	output.innerHTML = ammo;
}

function updateMultiBtn() {
	if (currWeapon.capacity < 10) {
		multiBtn.innerHTML = `shoot ${currWeapon.capacity}`;
	} else {
		multiBtn.innerHTML = `shoot ${10}`;
	}
}

function toggleClass(el, className) {
	el.classList.toggle(className);
}

function toggleShake(el) {
	el.classList.toggle('shake');
	setTimeout(() => el.classList.toggle('shake'), 500);
}

function toggleNoAmmo() {
	output.classList.toggle('ammo-empty');
	setTimeout(() => output.classList.toggle('ammo-empty'), 200);
}

/* Shoot all silently */
const shootAll = () => {
	allWeapons.forEach((weapon) => weapon.preloadData());
};
