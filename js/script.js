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

// Scoreboard elements
const cakeCountSpan = document.getElementById("cakeCount");
const clickValSpan = document.getElementById("clickValue");
const upgradesOwnedSpan = document.getElementById("upgradesOwned");
const cakesPerSecondSpan = document.getElementById("cakesPerSecond");

// Clicking bigCake
bigCake.addEventListener('click', (event) => {
    cakes += clickValue;

    const rect = document.getElementById("clickArea").getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.ClientY - rect.top;

    showFloatingNumber(x, y, clickValue);

    updateScoreboard();
    updateButtons();
    checkRewards();
});

function updateScoreboard() {
    cakeCountSpan.textContent = cakes;
    clickValSpan.textContent = clickValue;
    upgradesOwnedSpan.textContent = upgrades.autoClick + upgrades.click1 + upgrades.click2 + upgrades.click3;
    cakesPerSecondSpan.textContent = cakesPerSecond;
}

// When clicking upgrade buttons
let upgradeCosts = {
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
        
        //Increase cost 
        upgradeCosts.click1 = Math.floor(upgradeCosts.click1 *1.25);

        updateUpgradeText();
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
        //Increase cost 
        upgradeCosts.click2 = Math.floor(upgradeCosts.click2 *1.25);

        updateUpgradeText();
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
        
        //Increase cost 
        upgradeCosts.click3 = Math.floor(upgradeCosts.click3 *1.25);

        updateUpgradeText();
        updateScoreboard();
        updateButtons();
        checkRewards();
    }
});
function updateBakers(){
    const clickArea = document.getElementById("clickArea");
    const cakeBtn = document.getElementById("bigCake");
    //remove old bakers to draw new ones
    clickArea.querySelectorAll(".baker").forEach(b => b.remove());
   
    const n = upgrades.autoClick;
    if (n <= 0) return;
    const clickRect = clickArea.getBoundingClientRect();
    const cakeRect = cakeBtn.getBoundingClientRect();
    const centerX = (cakeRect.left + cakeRect.width / 2) - clickRect.left;
    const centerY = (cakeRect.top + cakeRect.height / 2) - clickRect.top;

    const radius = 140;
    for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const baker = document.createElement("div");
        baker.classList.add("baker");

        baker.textContent = (i % 2 === 0)? "👩🏾‍🍳" : "👩🏽‍🍳";
        baker.style.left = `${x}px`;
        baker.style.top = `${y}px`;
        
        clickArea.appendChild(baker);
    }
}
function bounceBakers () {
    document.querySelectorAll(".baker").forEach(baker => {
        baker.classList.remove("bounce");
        void baker.offsetWidth;
        baker.classList.add("bounce");
    });
}

autoClick.addEventListener('click', () => {
    if (cakes >= upgradeCosts.autoClick) {
        cakes -= upgradeCosts.autoClick;
        upgrades.autoClick += 1;
        cakesPerSecond += upgrades.autoClick;

        //Increase cost 
        upgradeCosts.autoclick = Math.floor(upgradeCosts.autoclick *1.25);

        updateUpgradeText();
        updateScoreboard();
        updateButtons();
        checkRewards();
        updateBakers();
    }
});

// AutoClicker interval
setInterval(() => {
    if (cakesPerSecond > 0) {
        cakes += cakesPerSecond;
        updateScoreboard();
        updateButtons();
        bounceBakers();
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
            
            showTrophy(element.textContent);
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
    clickValue = 1;
    cakesPerSecond = 0;
    upgrades = {
        click1: 0,
        click2: 0,
        click3: 0,
        autoClick: 0,
    }

    // Reset scoreboard
    updateScoreboard();

    // Reset upgrade buttons
    updateButtons();

    //Reset bakers
    updateBakers();

    // Reset rewards
    rewards.forEach(reward => {
        const element = document.getElementById(reward.id);
        element.classList.remove("unlocked");
        element.style.opacity = 0;
        element.style.transform = "scale(0.8)";
    });
});
//Trophy pop up
function showTrophy(message) {
    const popup = document.getElementById("trophyPopup");
    const text = document.getElementById("trophyText");
    text.textContent = message;
    popup.classList.add("show");

    //Hide after 3 seconds
    setTimeout(() => {
        popup.classList.remove("show");
    }, 3000);
}

function showFloatingNumber (x, y, value) {
    const number = document.createElement("div");
    number.classList.add("floatingNumber");
    number.textContent = `+${value}`;

    number.style.left = `${x}px`;
    number.style.top = `${y}px`;

    document.getElementById("clickArea").appendChild(number);

    setTimeout(() => {
        number.remove();
    }, 800);
}

function updateUpgradeText (){
    upClick1.textContent = `Increase Click Value (+1 click) Cost: ${upgradeCosts.click1} Cakes`;
    upClick2.textContent = `Increase Click Value (+5 click) Cost: ${upgradeCosts.click2} Cakes`;
    upClick3.textContent = `Increase Click Value (+10 click) Cost: ${upgradeCosts.click3} Cakes`;
    autoClick.textContent = `Hire Baker (auto click) Cost: ${upgradeCosts.autoClick} Cakes`;
}
window.addEventListener("resize", updateBakers);

updateScoreboard();
updateButtons();
