import { openModal, closeModal } from './modal';
import { postData } from '../services/services';
import utils from './utils';

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  const messages = {
    loading: './img/form/spinner.svg',
    success: 'Спасибо! Мы с Вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(form => bindPostData(form));
  

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

    previousModalDialog.classList.add(utils.hidden_classname);
    openModal('.modal', modalTimerId);

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
      previousModalDialog.classList.add(utils.shown_classname);
      previousModalDialog.classList.remove(utils.hidden_classname);
      closeModal('.modal');
    }, 4000)
  }
}

export default forms;