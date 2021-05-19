# CS:GO Weapons

## Introduction

This simple "[web application][1]" allows the user to cycle through a list of weapons from the game <em>Counter-Strike Global Offensive</em>. These particular weapons are objects, which are instantiated when the whole page is loaded with the `window.load` event listener. Users can shoot one or multiple shots with each weapon, additionally each weapon can be reloaded as well. When a new weapon is either selected, shot or reloaded a short audio representation of that will be played.

## Technologies

This web application is coded with vanilla JavaScript, coupled with HTML5 and CSS. The weapons are simply `.png` images, and the audio files are short `.wav` files. My intentions were to implement the functionality of the weapons with JavaScript `classes`, I believe, that I achieved that task relatively well, considering my not so <em>senior</em> coding skills.

## Additional Info

I initially coded this in late 2020, when learning how to manipulate the DOM with JavaScript. The initial version was a hot mess and packed with spaghetti code... 🍝⌨ In spring-summer of 2021, I refactored the code. After refactoring, the source code is much more readable and it is easier to conceptualize what is going on in the project. I believe there is alot to gain from simply skimming through this code, especially for beginners. 🙂

## Bugs

There are currently no bugs in this project. ⛱

[1]: https://csgo-weapons.netlify.app/
