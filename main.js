// App Initial State
const appLoaded = () => {
	currWeapon = allWeapons[0];
	updateAmmo(currWeapon.capacity);
	updateWeaponTitle(currWeapon.name);
	updateWeapon(currWeapon.images.inActive);
	shootAll(); /* silently shoot all */
};

// Weapons Object
class Weapon {
	constructor(name, capacity, ammo, firerate, inActive, active, fire, fill, draw) {
		this.name = name;
		this.capacity = capacity;
		this.ammo = ammo;
		this.firerate = firerate * 2; /* time in ms between each shot */
		this.images = {
			inActive: inActive,
			active: active,
		};
		this.audio = {
			fire: fire,
			fill: fill,
			draw: draw,
		};
	}
	shoot(volume) {
		let fireSound = new Audio(this.audio.fire);
		fireSound.play();
		fireSound.volume = volume;
	}
	reload(volume) {
		let reloadSound = new Audio(this.audio.fill);
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
		fireSound.src = this.audio.fire;
		let reloadSound = new Audio();
		reloadSound.src = this.audio.fill;
		let drawSound = new Audio();
		drawSound.src = this.audio.draw;
		let imgInactive = new Image();
		imgInactive.src = this.images.inActive;
		let imgActive = new Image();
		imgActive.src = this.images.active;
	}
}
// Weapon Instantiations
const weapon1 = new Weapon(
	'ak-47',
	30,
	30,
	100,
	'images/ak47.png',
	'images/shooting_ak47.png',
	'audio/ak47_fire.wav',
	'audio/ak47_fill.wav',
	'audio/ak47_draw.wav'
);
const weapon2 = new Weapon(
	'm4a1-s',
	25,
	25,
	100,
	'images/m4.png',
	'images/shooting_m4.png',
	'audio/m4_fire.wav',
	'audio/m4_fill.wav',
	'audio/m4_draw.wav'
);
const weapon3 = new Weapon(
	'galil AR',
	35,
	35,
	90,
	'images/galil.png',
	'images/shooting_galil.png',
	'audio/galil_fire.wav',
	'audio/galil_fill.wav',
	'audio/galil_draw.wav'
);
const weapon4 = new Weapon(
	'famas',
	25,
	25,
	90,
	'images/famas.png',
	'images/shooting_famas.png',
	'audio/famas_fire.wav',
	'audio/famas_fill.wav',
	'audio/famas_draw.wav'
);
const weapon5 = new Weapon(
	'AWP',
	10,
	10,
	225,
	'images/awp1.png',
	'images/shooting_awp1.png',
	'audio/awp_fire.wav',
	'audio/awp_fill.wav',
	'audio/awp_draw.wav'
);
const weapon6 = new Weapon(
	'mp5-sd',
	30,
	30,
	80,
	'images/mp5-sd.png',
	'images/shooting_mp5-sd.png',
	'audio/mp-5_fire.wav',
	'audio/mp-5_fill.wav',
	'audio/mp-5_draw.wav'
);
const weapon7 = new Weapon(
	'glock-18',
	20,
	20,
	150,
	'images/glock.png',
	'images/shooting_glock.png',
	'audio/glock_fire.wav',
	'audio/glock_fill.wav',
	'audio/glock_draw.wav'
);
const weapon8 = new Weapon(
	'usp-s',
	12,
	12,
	170,
	'images/usp.png',
	'images/shooting_usp.png',
	'audio/usp_fire.wav',
	'audio/usp_fill.wav',
	'audio/usp_draw.wav'
);
const weapon9 = new Weapon(
	'desert eagle',
	7,
	7,
	225,
	'images/deagle.png',
	'images/shooting_deagle.png',
	'audio/deagle_fire.wav',
	'audio/deagle_fill.wav',
	'audio/deagle_draw.wav'
);
const weapon10 = new Weapon(
	'p90',
	50,
	50,
	70,
	'images/p90.png',
	'images/shooting_p90.png',
	'audio/p90_fire.wav',
	'audio/p90_fill.wav',
	'audio/p90_draw.wav'
);
// End Weapon Instantiations

// All Weapons Array
const allWeapons = [
	weapon1,
	weapon2,
	weapon3,
	weapon4,
	weapon5,
	weapon6,
	weapon7,
	weapon8,
	weapon9,
	weapon10,
];

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
window.addEventListener('load', appLoaded);

// Select Current Weapon
function selectLeft() {
	if (!isShooting) {
		shootAll();
		index > 0 ? index-- : (index = allWeapons.length - 1);
		currWeapon = allWeapons[index];
		appendData(currWeapon);
	} else {
		toggleShake(leftBtn);
	}
}

function selectRight() {
	if (!isShooting) {
		shootAll();
		index < allWeapons.length - 1 ? index++ : (index = 0);
		currWeapon = allWeapons[index];
		appendData(currWeapon);
	} else {
		toggleShake(rightBtn);
	}
}

// Selector Logic
function appendData(currWeapon) {
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
	ammo <= 0 && (toggleShake(singleBtn), toggleNoAmmo());
	!isShooting ? shoot(ammo) : toggleShake(singleBtn);
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
