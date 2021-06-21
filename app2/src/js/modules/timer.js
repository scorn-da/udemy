import utils from './utils';

function timer(timerSelector, deadline) {
  function getNumberWithZero(number) {
    if (number >= 0 && number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }

  function getTimerSpread(endtime) {
    const timerSpread = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(timerSpread / (utils.time.millisecondsInASecond * utils.time.secondsInAMinute * utils.time.minutesInAHour * utils.time.hoursInADay));
    const hours = Math.floor((timerSpread / (utils.time.millisecondsInASecond * utils.time.secondsInAMinute)) % utils.time.hoursInADay);
    const minutes = Math.floor((timerSpread / utils.time.millisecondsInASecond / utils.time.secondsInAMinute) % utils.time.minutesInAHour);
    const seconds = Math.floor((timerSpread / utils.time.millisecondsInASecond) % utils.time.secondsInAMinute);

    return {
      'total': timerSpread,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function setTimer(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateTimer, utils.time.millisecondsInASecond);

    updateTimer();

    function updateTimer() {
      const timerSpread = getTimerSpread(endtime);

      days.textContent = getNumberWithZero(timerSpread.days);
      hours.textContent = getNumberWithZero(timerSpread.hours);
      minutes.textContent = getNumberWithZero(timerSpread.minutes);
      seconds.textContent = getNumberWithZero(timerSpread.seconds);

      if (timerSpread.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setTimer(timerSelector, deadline);
}

export default timer;