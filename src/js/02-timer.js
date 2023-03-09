import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const seconds = document.querySelector('[data-seconds]');
const minutes = document.querySelector('[data-minutes]');
const hours = document.querySelector('[data-hours]');
const days = document.querySelector('[data-days]');
const timerHTML = document.querySelector('.timer');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputDate, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', timerStart);

function timerStart() {
  let timerId = setInterval(() => {
    let countdown = new Date(inputDate.value) - new Date();
    startBtn.disabled = true;
    if (countdown >= 0) {
      const timeComponent = convertMs(countdown);

      updateValue(timeComponent);
      if (countdown <= 10000) {
        timerHTML.style.color = 'red';
      }
    } else {
      clearInterval(timerId);
      timerHTML.style.color = 'black';
      Notiflix.Notify.success('Countdown finished');
    }
  }, 1000);
}

function updateValue(timeComponent) {
  days.textContent = timeComponent.days;
  hours.textContent = timeComponent.hours;
  minutes.textContent = timeComponent.minutes;
  seconds.textContent = timeComponent.seconds;
}
