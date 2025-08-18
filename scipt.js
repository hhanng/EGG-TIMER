document.addEventListener("DOMContentLoaded", () => {
  const timers = {
    softBoiled: 6 * 60,
    jammyEgg: 8 * 60,
    hardBoiled: 12 * 60,
    extraHardBoiled: 15 * 60
  };

  const elements = {
    softBoiled: document.getElementById("softBoiled"),
    jammyEgg: document.getElementById("jammyEgg"),
    hardBoiled: document.getElementById("hardBoiled"),
    extraHardBoiled: document.getElementById("extraHardBoiled")
  };

  const cards = {
    softBoiled: document.querySelector('[data-key="softBoiled"]'),
    jammyEgg: document.querySelector('[data-key="jammyEgg"]'),
    hardBoiled: document.querySelector('[data-key="hardBoiled"]'),
    extraHardBoiled: document.querySelector('[data-key="extraHardBoiled"]')
  };

  let countdowns = {};
  let finished = {};
  let intervalId = null;

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  function updateDisplays() {
    for (let key in timers) {
      elements[key].textContent = formatTime(countdowns[key]);
    }
  }

  function tick() {
    let allFinished = true;
    for (let key in countdowns) {
      if (countdowns[key] > 0) {
        countdowns[key]--;
        if (countdowns[key] === 0 && !finished[key]) {
          finished[key] = true;
          cards[key]?.classList.add("done");
          // Optional: play a sound. Drop an mp3 as "ding.mp3"
          // new Audio("ding.mp3").play().catch(() => {});
        }
      }
      if (countdowns[key] > 0) allFinished = false;
    }
    updateDisplays();

    if (allFinished) {
      clearInterval(intervalId);
      intervalId = null;
      alert("All eggs are ready!");
    }
  }

  function startCountdown() {
    if (intervalId) return;
    intervalId = setInterval(tick, 1000);
  }

  function resetCountdown() {
    clearInterval(intervalId);
    intervalId = null;
    countdowns = { ...timers };
    finished = { softBoiled:false, jammyEgg:false, hardBoiled:false, extraHardBoiled:false };
    Object.values(cards).forEach(c => c?.classList.remove("done"));
    updateDisplays();
  }

  // init
  resetCountdown();

  document.getElementById("start-button").addEventListener("click", startCountdown);
  document.getElementById("reset-button").addEventListener("click", resetCountdown);
});
