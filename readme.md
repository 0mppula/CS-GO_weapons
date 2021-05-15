# CS:GO Weapons

## Introduction

This simple [web application](https://csgo-weapons.netlify.app/) allows the user to cycle through a list of weapons from the game <em>Counter-Strike Global Offensive</em>. These particular weapons are objects, which are instantiated when the whole page is loaded with the `window.load` event listener. Users can shoot one or multiple shots with each weapon, additionally each weapon can be reloaded as well. When a new weapon is either selected, shot or reloaded a short audio representation will be played.

## Technologies

This web application is coded with vanilla JavaScript, coupled with HTML5 and CSS. The weapons are simply `.png` images, and the audio files are short `.wav` files. My intentions were to implement the functionality of the weapons with JavaScript `classes`, I believe, that I achieved that task relatively well, considering my not so <em>senior</em> coding skills.

## Bugs

There are a few bugs in this project, and **any** help or contributions are **HUGELY** appreciated!! 🙂

**Bug #1:** I can't seem to decrease the loading times of the weapons or the loading times for the weapons audio effects sufficiently to work smoothly on deployed [live versions](https://csgo-weapons.netlify.app/). (<em>latency of switching or shooting weapons for the first time</em>).<br> This web application works perfectly, and the way it was initially intented to work on local machines.
