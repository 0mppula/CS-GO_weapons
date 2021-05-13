// App Initial State
const appLoaded = () => {
	console.log('App Loaded!');
	currWeapon = allWeapons[0];
	output.innerHTML = currWeapon.capacity;
	weaponTitle.innerHTML = currWeapon.name;
	weaponContainer.setAttribute('src', currWeapon.images.inActive);
	fireSound = new Audio(currWeapon.audio.fire);
	reloadSound = new Audio(currWeapon.audio.fill);
	drawSound = new Audio(currWeapon.audio.draw);
	shootAll(); /* silently shoot all to init app */
};

let fireSound;
let reloadSound;
let drawSound;
// let specialSound;

// Weapons Object
class Weapon {
	constructor(name, capacity, ammo, firerate, inActive, active, fire, fill, draw, special) {
		this.name = name;
		this.capacity = capacity;
		this.ammo = ammo;
		this.firerate = firerate; /* time in ms between each shot */
		this.images = {
			inActive: inActive,
			active: active,
		};
		this.audio = {
			fire: fire,
			fill: fill,
			draw: draw,
			special: special,
		};
	}
	fireSFX() {
		fireSound = new Audio(this.audio.fire);
		fireSound.play();
		fireSound.volume = 0.05;
	}
	reloadSFX() {
		reloadSound = new Audio(this.audio.fill);
		reloadSound.play();
		reloadSound.volume = 0.1;
	}
	drawSFX() {
		drawSound = new Audio(this.audio.draw);
		drawSound.play();
		drawSound.volume = 0.1;
	}
	preloadAudio() {
		fireSound = new Audio(this.audio.fire);
		// fireSound.play();
		fireSound.volume = 0;
		reloadSound = new Audio(this.audio.fill);
		// reloadSound.play();
		reloadSound.volume = 0;
		drawSound = new Audio(this.audio.draw);
		// drawSound.play();
		drawSound.volume = 0;
	}
	loadSFX() {
		/* loads new audio for weapon */
		drawSound.load(currWeapon.audio.fire);
		drawSound.load(currWeapon.audio.fill);
		drawSound.load(currWeapon.audio.draw);
		console.log(drawSound);
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
	300,
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
	'audio/p90_draw.wav',
	'audio/cyka_blyat.wav'
);
// End Weapon Instantiations

// All Weapons Array
const allWeapons = [weapon1, weapon2, weapon3, weapon4, weapon5, weapon6, weapon7, weapon8, weapon9, weapon10];

// Variables
const leftBtn = document.querySelector('.select-left');
const rightBtn = document.querySelector('.select-right');
const weaponTitle = document.querySelector('.weapon-title');
const output = document.getElementById('output');
const singleBtn = document.querySelector('.single');
const multiBtn = document.querySelector('.multiple');
const reloadBtn = document.querySelector('.reload');
const weaponContainer = document.querySelector('.weapon-wrapper img');
let currWeapon;
let index = 0;
let isShooting = false;

// Event Listeners
rightBtn.addEventListener('click', selectRight);
leftBtn.addEventListener('click', selectLeft);
singleBtn.addEventListener('click', shootOne);
multiBtn.addEventListener('click', shootMulti);
reloadBtn.addEventListener('click', reload);
window.addEventListener('load', appLoaded);

// Select Current Weapon
// Right Direction
function selectLeft() {
	if (isShooting === false) {
		shootAll();
		if (index > 0) {
			/* 1 */
			index--;
		} else {
			index = allWeapons.length - 1;
		}
		appendData();
	} else {
		leftBtn.classList.toggle('shake');
		setTimeout(() => {
			leftBtn.classList.toggle('shake');
		}, 500);
	}
}

// Left Direction
function selectRight() {
	if (isShooting === false) {
		shootAll();
		if (index < allWeapons.length - 1) {
			/* 1 */
			index++;
		} else {
			index = 0;
		}
		appendData();
	} else {
		rightBtn.classList.toggle('shake');
		setTimeout(() => {
			rightBtn.classList.toggle('shake');
		}, 500);
	}
}

// Selector Logic
function appendData() {
	currWeapon = allWeapons[index]; /* Keeps track of current weapon */
	// currWeapon.loadSFX();
	weaponContainer.setAttribute('src', currWeapon.images.inActive); /* returns non shooting image */
	weaponContainer.classList.toggle('select-weapon'); /* select animation */
	weaponTitle.innerHTML = currWeapon.name; /* returns weapon title */
	output.innerHTML = currWeapon.ammo; /* returns weapon ammo capacity title */
	setTimeout(() => {
		weaponContainer.classList.toggle('select-weapon'); /* remove select animation */
	}, 300);
	/* Audio */
	currWeapon.drawSFX();
}

// Shooting Logic
function shoot() {
	if (currWeapon.ammo > 0) {
		currWeapon.ammo--;
		output.innerHTML = currWeapon.ammo;
		weaponContainer.setAttribute('src', currWeapon.images.active); // sets img src value (shooting)
		weaponContainer.classList.toggle('shooting');
		/* condition for weapon with fire rate < 100ms (slow)*/
		if (currWeapon.firerate > 100) {
			setTimeout(() => {
				weaponContainer.setAttribute('src', currWeapon.images.inActive);
				weaponContainer.classList.toggle('shooting');
				currWeapon.fireSFX();
			}, 100);
			/* condition for weapon with fire rate < 100ms (fast)*/
		} else if (currWeapon.firerate <= 100) {
			setTimeout(() => {
				weaponContainer.setAttribute('src', currWeapon.images.inActive); // sets img src value (not shooting)
				weaponContainer.classList.toggle('shooting');
				/* Audio */
				currWeapon.fireSFX();
			}, currWeapon.firerate - 50);
		}
	} else {
		currWeapon.ammo = 0;
		output.classList.toggle('ammo-empty');
		setTimeout(() => {
			output.classList.toggle('ammo-empty');
		}, 200);
	}
}

// Shoot Once
function shootOne() {
	if (isShooting === false) {
		shoot();
	} else {
		singleBtn.classList.toggle('shake');
		setTimeout(() => {
			singleBtn.classList.toggle('shake');
		}, 500);
	}
}

// Shoot Multiple Times
function shootMulti() {
	let i = 0;
	let shots = 0;
	if (currWeapon.ammo > 0 && isShooting === false) {
		for (i = 0; i < 10; i++) {
			isShooting = true;
			setTimeout(() => {
				shoot();
				shots++;
				if (shots === 10) {
					isShooting = false;
				}
			}, currWeapon.firerate * i);
		}
	} else {
		output.classList.toggle('ammo-empty');
		setTimeout(() => {
			output.classList.toggle('ammo-empty');
		}, 200);
	}
}

// Reload Weapon Function
function reload() {
	if (isShooting === false) {
		currWeapon.ammo = currWeapon.capacity;
		output.innerHTML = currWeapon.ammo;
		output.classList.toggle('ammo-reloaded');
		/* Audio */
		currWeapon.reloadSFX();
		setTimeout(() => {
			output.classList.toggle('ammo-reloaded');
		}, 200);
	} else {
		reloadBtn.classList.toggle('shake');
		setTimeout(() => {
			reloadBtn.classList.toggle('shake');
		}, 500);
	}
}

/* Shoot all silently */
let i = 0;
const shootAll = () => {
	for (i = 0; i < allWeapons.length; i++) {
		allWeapons[i].preloadAudio();
	}
};
