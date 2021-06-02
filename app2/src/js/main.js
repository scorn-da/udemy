document.addEventListener('DOMContentLoaded', () => {

  const UTILS = {
    time: {
      hoursInADay: 24,
      minutesInAHour: 60,
      secondsInAMinute: 60,
      millisecondsInASecond: 1000,
    },
  };
  const HIDDEN_CLASSNAME = 'hide';
  const SHOWN_CLASSNAME = 'show';
  const FADE_CLASSNAME = 'fade';

  const tabsContainer = document.querySelector('.tabcontainer');
  const tabs = tabsContainer.querySelectorAll('.tabheader__item');
  const tabsContent = tabsContainer.querySelectorAll('.tabcontent');
  const tabsParent = tabsContainer.querySelector('.tabheader__items');


  function hideTabContent () {
    tabsContent.forEach(item => {
      item.classList.add(HIDDEN_CLASSNAME);
      item.classList.remove(SHOWN_CLASSNAME, FADE_CLASSNAME);
    });

    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
  }
  
  function showTabContent(i = 0) {
    tabsContent[i].classList.add(SHOWN_CLASSNAME, FADE_CLASSNAME);
    tabsContent[i].classList.remove(HIDDEN_CLASSNAME);
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent(0);

  tabsParent.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer

  const deadline = '2021-04-15';

  function getNumberWithZero(number) {
    if (number >= 0 && number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }

  function getTimerSpread(endtime) {
      const timerSpread = Date.parse(endtime) - Date.parse(new Date());
      const days = Math.floor(timerSpread / (UTILS.time.millisecondsInASecond * UTILS.time.secondsInAMinute * UTILS.time.minutesInAHour * UTILS.time.hoursInADay));
      const hours = Math.floor((timerSpread / (UTILS.time.millisecondsInASecond * UTILS.time.secondsInAMinute)) % UTILS.time.hoursInADay);
      const minutes = Math.floor((timerSpread / UTILS.time.millisecondsInASecond / UTILS.time.secondsInAMinute) % UTILS.time.minutesInAHour);
      const seconds = Math.floor((timerSpread / UTILS.time.millisecondsInASecond) % UTILS.time.secondsInAMinute);

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
    const timeInterval = setInterval(updateTimer, UTILS.time.millisecondsInASecond);

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

  setTimer('.timer', deadline);


  // Modal

  const modal = document.querySelector('.modal');
  const openModalBtns = document.querySelectorAll('[data-modal-open]');

  function closeModal() {
    modal.classList.remove(SHOWN_CLASSNAME, FADE_CLASSNAME);
    modal.classList.add(HIDDEN_CLASSNAME);
    document.body.style.overflowY = 'visible';
  }

  function openModal() {
    modal.classList.remove(HIDDEN_CLASSNAME);
    modal.classList.add(SHOWN_CLASSNAME, FADE_CLASSNAME);
    document.body.style.overflowY = 'hidden';
    clearInterval(modalTimerId);
  }

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal.classList.contains(HIDDEN_CLASSNAME)) {
        openModal();
      }
    });
  });

  modal.addEventListener('click', evt => {
    if (evt.target === modal || evt.target.getAttribute('data-modal-close') === '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);
  window.addEventListener('scroll', showModalByScroll);

  // adding content

  const menuCardsContainer = document.querySelector('.menu .container');

  const clearElement = element => {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  };

  clearElement(menuCardsContainer);

  /*class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...classNames) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.classNames = classNames;
      this.parent = document.querySelector(parentSelector);
      this.moneyTransferValue = 75.22;
      this.changeCurrencyValue();
    }

    changeCurrencyValue() {
      this.price *= this.moneyTransferValue;
    }

    render() {
      const element = document.createElement('div');

      if (this.classNames.length === 0) {
        element.classList.add('menu__item');
      } else {
        this.classNames.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
                  <img src=${this.src} alt=${this.alt}>
                  <h3 class="menu__item-subtitle">${this.title}</h3>
                  <div class="menu__item-descr">${this.description}</div>
                  <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                      <div class="menu__item-cost">Цена:</div>
                      <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                  </div>
            `;
      this.parent.append(element);
    }
  }*/

  /*const getResource = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };*/

  /*getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });*/

  /*getResource('http://localhost:3000/menu')
    .then(data => createCard(data));*/

  axios.get('http://localhost:3000/menu')
    .then(data => createCard(data.data));
  
  function createCard(data) {
    data.forEach(({img, altimg, title, descr, price}) => {
      const element = document.createElement('div');

      const transferMoneyValue = 75.22;

      price *= transferMoneyValue;

      element.classList.add('menu__item');

      element.innerHTML = `
          <img src=${img} alt=${altimg}>
          <h3 class="menu__item-subtitle">${title}</h3>
          <div class="menu__item-descr">${descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${price}</span> руб/день</div>
          </div>
       `;

      document.querySelector('.menu .container').append(element);
    });
  }

  // Forms
  const forms = document.querySelectorAll('form');

  const messages = {
    loading: './img/form/spinner.svg',
    success: 'Спасибо! Мы с Вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(form => bindPostData(form));


  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
      `;

      statusMessage.textContent = messages.loading;
      form.append(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json =  JSON.stringify(Object.fromEntries(formData));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(messages.success);
          setTimeout(() => {
            statusMessage.remove()
          }, 2000);
        })
        .catch(() => {
          showThanksModal(messages.failure);
        })
        .finally(() => form.reset());
    })
  }

  function showThanksModal(message) {
    const previousModalDialog = document.querySelector('.modal__dialog');

    previousModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-modal-close aria-label="Закрыть окно">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      previousModalDialog.classList.add('show');
      previousModalDialog.classList.remove('hide');
      closeModal();
    }, 4000)
  }

  // Slider

  const slider = document.querySelector('.offer__slider');
  const slides = slider.querySelectorAll('.offer__slide');
  const prev = slider.querySelector('.offer__slider-prev');
  const next = slider.querySelector('.offer__slider-next');
  const total = slider.querySelector('#total');
  const current = slider.querySelector('#current');
  const slidesWrapper = slider.querySelector('.offer__slider-wrapper');
  const slidesContainer = slider.querySelector('.offer__slider-inner');
  const width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  slidesContainer.style.width = 100 * slides.length + '%';
  slidesContainer.style.display = 'flex';
  slidesContainer.style.transition = '0.5s all';

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol');
  const dots = [];
  indicators.classList.add('offer__carousel-indicators');

  indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
    `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if (i === 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function makeTwoDigitNumber (number) {
    return number < 10 ? `0${number}` : '' + number;
  }

  function setCurrentSlide (number) {
    current.textContent = number;
  }

  function setHalfOpacityToDots () {
    dots.forEach(dot => dot.style.opacity = '.5');
  }

  function setActiveDot (currentSlide) {
    dots[currentSlide - 1].style.opacity = '1';
  }

  function setDotsStates () {
    setHalfOpacityToDots();
    setActiveDot(slideIndex);
  }

  function deleteNotDigitSymbols(str) {
    return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
    if (offset === deleteNotDigitSymbols(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigitSymbols(width);
    }

    slidesContainer.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    setCurrentSlide(makeTwoDigitNumber(slideIndex));

    setDotsStates(slideIndex);
  });

  prev.addEventListener('click', () => {
    if (offset === 0) {
      offset = deleteNotDigitSymbols(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigitSymbols(width);
    }

    slidesContainer.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    setCurrentSlide(makeTwoDigitNumber(slideIndex));

    setDotsStates(slideIndex);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', evt => {
      const slideTo = evt.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigitSymbols(width) * (slideTo - 1);

      slidesContainer.style.transform = `translateX(-${offset}px)`;


      setCurrentSlide(makeTwoDigitNumber(slideIndex));

      setDotsStates(slideIndex);
    });
  });
});