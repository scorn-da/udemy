function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  const slider = document.querySelector(container);
  const slides = slider.querySelectorAll(slide);
  const prev = slider.querySelector(prevArrow);
  const next = slider.querySelector(nextArrow);
  const total = slider.querySelector(totalCounter);
  const current = slider.querySelector(currentCounter);
  const slidesWrapper = slider.querySelector(wrapper);
  const slidesContainer = slider.querySelector(field);
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

  function makeTwoDigitNumber(number) {
    return number < 10 ? `0${number}` : '' + number;
  }

  function setCurrentSlide(number) {
    current.textContent = number;
  }

  function setHalfOpacityToDots() {
    dots.forEach(dot => dot.style.opacity = '.5');
  }

  function setActiveDot(currentSlide) {
    dots[currentSlide - 1].style.opacity = '1';
  }

  function setDotsStates() {
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
}

export default slider;