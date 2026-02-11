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
    updateButtons();
    checkRewards();
});

function updateScoreboard() {
    scoreboard[0].textContent = `Number of cakes you have: ${cakes}`;
    scoreboard[1].textContent = `Click value: ${clickValue}`;
    scoreboard[2].textContent = `Upgrades you own: ${upgrades.click1 + upgrades.click2 + upgrades.click3 + upgrades.autoClick}`;
    scoreboard[3].textContent = `Cakes per second: ${cakesPerSecond}`;
}

// When clicking upgrade buttons
const upgradeCosts = {
    click1: 10,
    click2: 50,
    click3: 100,
    autoClick: 200
};

upClick1.addEventListener('click', () => {
    if (cakes >= upgradeCosts.click1) {
        cakes -= upgradeCosts.click1;
        clickValue += 1;
        upgrades.click1 += 1;
        updateScoreboard();
        updateButtons();
        checkRewards();
    }
});

upClick2.addEventListener('click', () => {
    if (cakes >= upgradeCosts.click2) {
        cakes -= upgradeCosts.click2;
        clickValue += 5;
        upgrades.click2 += 1;
        updateScoreboard();
        updateButtons();
        checkRewards();
    }
});

upClick3.addEventListener('click', () => {
    if (cakes >= upgradeCosts.click3) {
        cakes -= upgradeCosts.click3;
        clickValue += 10;
        upgrades.click3 += 1;
        updateScoreboard();
        updateButtons();
        checkRewards();
    }
});

autoClick.addEventListener('click', () => {
    if (cakes >= upgradeCosts.autoClick) {
        cakes -= upgradeCosts.autoClick;
        upgrades.autoClick += 1;
        cakesPerSecond += 1;
        updateScoreboard();
        updateButtons();
        checkRewards();
    }
});

// AutoClicker interval
setInterval(() => {
    if (cakesPerSecond > 0) {
        cakes += cakesPerSecond;
        updateScoreboard();
        updateButtons();
    }
}, 1000);

// Disable upgrades player can't use
function updateButtons() {
    upClick1.disabled = cakes < upgradeCosts.click1;
    upClick2.disabled = cakes < upgradeCosts.click2;
    upClick3.disabled = cakes < upgradeCosts.click3;
    autoClick.disabled = cakes < upgradeCosts.autoClick;
}

// Reward System
const rewards = [
    { id: "reward1", threshold: 1 },
    { id: "reward2", threshold: 100 },
    { id: "reward3", threshold: 1000 },
    { id: "reward4", threshold: 10000 },
    { id: "reward5", threshold: 100000 },
]

function checkRewards() {
    rewards.forEach(reward => {
        const element = document.getElementById(reward.id);
        if (cakes >= reward.threshold && !element.classList.contains("unlocked")) {
            element.classList.add("unlocked");
            element.style.opacity = 1;
            element.style.transform = "scale(1.2)";

            // Animation
            setTimeout(() => {
                element.style.transform = "scale(1)";
            }, 500);
        }
    });
}

// Reset Button
const resetButton = document.getElementById("reset");

resetButton.addEventListener('click', () => {
    // Reset game stats
    cakes = 0;
    let clickValue = 1;
    let cakesPerSecond = 0;
    let upgrades = {
        click1: 0,
        click2: 0,
        click3: 0,
        autoClick: 0,
    }

    // Reset scoreboard
    updateScoreboard();

    // Reset upgrade buttons
    updateButtons();

    // Reset rewards
    rewards.forEach(reward => {
        const element = document.getElementById(reward.id);
        element.classList.remove("unlocked");
        element.style.opacity = 0;
        element.style.transform = "scale(0.8)";
    });
});