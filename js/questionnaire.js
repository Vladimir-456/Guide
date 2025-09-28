import { initValidate } from './validate.js';
import { lockScroll, unlockScroll } from "./utils.js";

const profileModal = document.querySelector('.profile-modal__overlay');
const profileModalCloseBtn = document.querySelector('.profile-modal__close');
const profileModalForm = document.querySelector('#profile-modal__form');
const profileModalButton = document.querySelector('.button--anketa');

const API_URL = '/api/application';

const openModal = () => {
    profileModal.style.display = 'block';
    lockScroll();
    profileModalCloseBtn.addEventListener('click', closeModal);
}

const onFormSubmit = async (evt) => {
    evt.preventDefault();
    console.log('Форма отправляется');

    const validator = initValidate();
    if (!validator) {
        console.error('Failed to initialize form validation');
        return;
    }

    const isValid = await validator.revalidate();
    console.log('isValid:', isValid);

    if (!isValid) {
        return;
    }

    const formData = new FormData(evt.target);
    const formDataObj = Object.fromEntries(formData);
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(formDataObj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Ответ получен, статус:', response.status);
 
        if(!response.ok) {
            console.error('Ошибка сети:', response.status, await response.text());
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Ответ сервера:', result);
        closeModal();
        console.log('Редирект на /manage');
        window.location.href = '/manage';
        profileModalForm.reset();
 
    } catch (error) {
        console.error('Error:', error);
    }
}

function closeModal () {
    profileModal.style.display = 'none';
    unlockScroll();
    profileModalForm.reset();
    profileModalCloseBtn.removeEventListener('click', closeModal);
}

export const initProfileModal = () => {
    profileModalButton.addEventListener('click', openModal);
    profileModalForm.addEventListener('submit', onFormSubmit);
}