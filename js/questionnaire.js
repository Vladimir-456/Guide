const profileModal = document.querySelector('.profile-modal');
const profileModalCloseBtn = document.querySelector('.profile-modal__close');
const profileModalForm = document.querySelector('.profile-modal__form');
const profileModalButton = document.querySelector('.button--anketa');

const openModal = () => {
    profileModal.style.display = 'block';
    profileModalCloseBtn.addEventListener('click', closeModal);
}

const closeModal = () => {
    profileModal.style.display = 'none';
    form.reset();
    profileModalCloseBtn.removeEventListener('click', closeModal);
}

export const initProfileModal = () => {
    // profileModalForm.addEventListener('submit', (evt) => onFormSubmit(evt));
    profileModalButton.addEventListener('click', openModal);
}