const refs = {
    bodyRef: document.querySelector("body"),
    buttonStartRef: document.querySelector("button[data-start]"),
    buttonStopRef: document.querySelector("button[data-stop]"),
  };
  const INTERVAL_CHANGE_COLOR = 1000;
  let timerId = null;
  
  refs.buttonStopRef.setAttribute("disabled", "disabled");
  
  refs.buttonStartRef.addEventListener("click", onButtonStartClick);
  refs.buttonStopRef.addEventListener("click", onButtonStopClick);
  
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
  
  function onButtonStartClick() {
    timerId = setInterval(() => {
      const colorChange = getRandomHexColor();
      refs.bodyRef.style.backgroundColor = colorChange;
    }, INTERVAL_CHANGE_COLOR);
    refs.buttonStartRef.setAttribute("disabled", "disabled");
    refs.buttonStopRef.removeAttribute("disabled");
  }
  
  function onButtonStopClick() {
    refs.buttonStopRef.setAttribute("disabled", "disabled");
    refs.buttonStartRef.removeAttribute("disabled");
  
    clearInterval(timerId);
  }
