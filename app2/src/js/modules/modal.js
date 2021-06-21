import utils from './utils';

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove(utils.shown_classname, utils.fade_classname);
  modal.classList.add(utils.hidden_classname);
  document.body.style.overflowY = 'visible';
}

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove(utils.hidden_classname);
  modal.classList.add(utils.shown_classname, utils.fade_classname);
  document.body.style.overflowY = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  const openModalBtns = document.querySelectorAll(triggerSelector);


  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal.classList.contains(utils.hidden_classname)) {
        openModal(modalSelector, modalTimerId);
      }
    });
  });

  modal.addEventListener('click', evt => {
    if (evt.target === modal || evt.target.getAttribute('data-modal-close') === '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      closeModal(modalSelector);
    }
  });


  window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};
