function calc() {
  const result = document.querySelector('.calculating__result span');

  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', sex);
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', ratio);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.dataset.ratio === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    })
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotalCalories() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '!!!!';
      return;
    }

    if (sex === 'female') {
      result.textContent = '' + Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = '' + Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotalCalories();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (evt) => {
        if (evt.target.dataset.ratio) {
          ratio =  +evt.target.dataset.ratio;
          localStorage.setItem('ratio', +evt.target.dataset.ratio);
        } else {
          sex = evt.target.getAttribute('id');
          localStorage.setItem('sex', evt.target.getAttribute('id'));
        }

        elements.forEach(element => {
          element.classList.remove(activeClass);
        });

        evt.target.classList.add(activeClass);
        calcTotalCalories();
      })
    });

  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    if (input.value.match(/\D/g)) {
      input.style.border = '1px solid red';
    }

    input.addEventListener('input', () => {
      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = input.value;
          break;
        case 'age':
          age = input.value;
          break;
      }

      calcTotalCalories();
    });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

export default calc;