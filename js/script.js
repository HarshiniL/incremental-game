// When initializing the game
let cakes = 0;
let clickValue = 1;
let cakesPerSecond = 0;
let upgrades = {
    click1: 0,
    click2: 0,
    click3: 0,
    autoClick: 0,
};

// Grabbing buttons from DOM
const bigCake = document.getElementById("bigCake");
const upClick1 = document.getElementById("upClick1");
const upClick2 = document.getElementById("upClick2");
const upClick3 = document.getElementById("upClick3");
const autoClick = document.getElementById("autoClick");

// Scoreboard
const scoreboard = document.getElementById("scoreboard").children;

// Clicking bigCake
bigCake.addEventListener('click', () => {
    cakes += clickValue;
    updateScoreboard();
    showClickAnimation();
});

function updateScoreboard() {
    scoreboard[0].textContent = 'Number of cakes you have: #{cakes}';
    scoreboard[1].textContent = 'Click value: #{clickValue}';
    scoreboard[2].textContent = 'Upgrades you own: #{upgrades.click1 + upgrades.click2 + upgrades.click3 + upgrades.autoClick}';
    scoreboard[3].textContent = 'Cakes per second: #{cakesPerSecond}';
}

// When clicking upgrade buttons
