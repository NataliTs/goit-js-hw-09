const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop');

let colorInterval = null;
stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangeColor);

function startChangeColor() {
  if (colorInterval) return;

  startBtn.disabled = true;
  stopBtn.disabled = false;

  colorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeColor() {
  stopBtn.disabled = true;
  startBtn.disabled = false;

  clearInterval(colorInterval);
  colorInterval = undefined;
}
