import { lockScroll, unlockScroll } from "./utils.js";

const modalOverlay = document.querySelector('.yandex-modal__overlay');
const modalCloseBtn = modalOverlay.querySelector('.yandex-modal__close');
const modalButtons = document.querySelectorAll('.yandex-modal__button');

function openModalView() {
    modalOverlay.style.display = 'block';
    lockScroll();
    modalCloseBtn.addEventListener('click', closeModalView);
}

function closeModalView() {
    modalOverlay.style.display = 'none';
    unlockScroll();
    modalCloseBtn.removeEventListener('click', closeModalView);
}


export const initReviewModal = () => {
    modalButtons.forEach((button) => button.addEventListener('click', openModalView));
}
