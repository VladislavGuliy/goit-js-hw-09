import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const TIMER_INTERVAL = 1000;

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

let timerId = null;

refs.buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = Date.now();
    
    if (selectedDates[0] <= dateNow) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.buttonStart.disabled = true;
    } else {
      Notiflix.Notify.success('Please press the Start button!');
      refs.buttonStart.disabled = false;
    }
  },
};

flatpickr(refs.inputDate, options);

refs.buttonStart.addEventListener('click', onButtonStartClick);

function onButtonStartClick() {
  refs.buttonStart.disabled = true;
  refs.inputDate.disabled = true;

  timerId = setInterval(() => {
    const selectedDate = new Date(refs.inputDate.value);
    const currentDate = Date.now();
    const deltaTime = selectedDate - currentDate;
    const countdownTime = convertMs(deltaTime);

    timeDisplay(countdownTime);

    if (deltaTime < 1000) {
      clearInterval(timerId);
      refs.inputDate.disabled = false;
    }
  }, 1000);
}

function timeDisplay({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
