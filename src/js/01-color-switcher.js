const refs = {
    body: document.querySelector("body"),
    buttonStart: document.querySelector("button[data-start]"),
    buttonStop: document.querySelector("button[data-stop]"),
  };
  const INTERVAL_CHANGE_COLOR = 1000;
  let timerId = null;
  
  refs.buttonStop.disabled = true;
  
  refs.buttonStart.addEventListener("click", onButtonStartClick);
  refs.buttonStop.addEventListener("click", onButtonStopClick);
  
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
  
  function onButtonStartClick() {
    timerId = setInterval(() => {
      const colorChange = getRandomHexColor();
      refs.body.style.backgroundColor = colorChange;
    }, INTERVAL_CHANGE_COLOR);
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;
  }
  
  function onButtonStopClick() {
    refs.buttonStop.disabled = true;
    refs.buttonStart.disabled = false;
  
    clearInterval(timerId);
  }
