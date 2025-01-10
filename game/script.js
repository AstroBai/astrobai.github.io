// 游戏状态
let energy = 0;
let energyPerClick = 1;
let clickUpgradeCost = 10;
let autogenerateUpgradeCost = 50;
let autogenerateRate = 0.1;
let lastAutoGenerate = Date.now();

// 获取界面元素
const energyDisplay = document.getElementById("energy");
const clickButton = document.getElementById("clickButton");
const upgradeClickButton = document.getElementById("upgradeClickButton");
const upgradeAutogenerateButton = document.getElementById("upgradeAutogenerateButton");

const superEnergyButton = document.getElementById("superEnergyButton");
const timeAcceleratorButton = document.getElementById("timeAcceleratorButton");
const blackHoleButton = document.getElementById("blackHoleButton");
const spaceshipButton = document.getElementById("spaceshipButton");

const exitButton = document.getElementById("exitButton");

// 道具定义
const items = {
  "Super Energy": { price: 50, effect: () => 100 },
  "Time Accelerator": { price: 100, effect: () => 1.5 },
  "Black Hole Generator": { price: 200, effect: () => 5 },
  "Spaceship": { price: 150, effect: () => 0.8 },
};

// 更新能量显示
function updateEnergyDisplay() {
  energyDisplay.textContent = Math.floor(energy);
}

// 点击生成能量
clickButton.addEventListener("click", () => {
  energy += energyPerClick;
  updateEnergyDisplay();
});

// 升级点击
upgradeClickButton.addEventListener("click", () => {
  if (energy >= clickUpgradeCost) {
    energy -= clickUpgradeCost;
    energyPerClick += 1;
    clickUpgradeCost *= 1.5;
    updateEnergyDisplay();
    alert(`Click upgraded! Now you generate ${energyPerClick} energy per click.`);
  } else {
    alert("Not enough energy to upgrade click.");
  }
});

// 升级自动生成
upgradeAutogenerateButton.addEventListener("click", () => {
  if (energy >= autogenerateUpgradeCost) {
    energy -= autogenerateUpgradeCost;
    autogenerateRate *= 1.5;
    autogenerateUpgradeCost *= 1.5;
    updateEnergyDisplay();
    alert(`Autogenerate upgraded! Now you generate ${autogenerateRate} energy per second.`);
  } else {
    alert("Not enough energy to upgrade autogenerate.");
  }
});

// 购买道具
superEnergyButton.addEventListener("click", () => buyItem("Super Energy"));
timeAcceleratorButton.addEventListener("click", () => buyItem("Time Accelerator"));
blackHoleButton.addEventListener("click", () => buyItem("Black Hole Generator"));
spaceshipButton.addEventListener("click", () => buyItem("Spaceship"));

function buyItem(itemName) {
  const item = items[itemName];
  if (energy >= item.price) {
    energy -= item.price;
    let effect = item.effect();
    if (itemName === "Super Energy") {
      energy += effect;
      alert(`You used Super Energy, gaining ${effect} energy!`);
    } else if (itemName === "Time Accelerator") {
      autogenerateRate *= effect;
      alert(`You used Time Accelerator, your autogenerate rate is now ${autogenerateRate}.`);
    } else if (itemName === "Black Hole Generator") {
      energyPerClick *= effect;
      alert(`You used Black Hole Generator, now you generate ${Math.floor(energyPerClick)} energy per click.`);
    } else if (itemName === "Spaceship") {
      clickUpgradeCost *= effect;
      alert(`You used Spaceship, next upgrade will cost ${Math.floor(clickUpgradeCost)} energy.`);
    }
    updateEnergyDisplay();
  } else {
    alert(`Not enough energy to buy ${itemName}.`);
  }
}

// 自动生成能量
function autoGenerateEnergy() {
  setInterval(() => {
    if (Date.now() - lastAutoGenerate >= 1000) {
      energy += autogenerateRate;
      lastAutoGenerate = Date.now();
      updateEnergyDisplay();
    }
  }, 1000);
}

// 退出游戏
exitButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to exit the game?")) {
    window.close();
  }
});

// 启动自动生成
autoGenerateEnergy();
