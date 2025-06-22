import { initValidate } from './validate.js';

const profileModal = document.querySelector('.profile-modal__overlay');
const profileModalCloseBtn = document.querySelector('.profile-modal__close');
const profileModalForm = document.querySelector('#profile-modal__form');
const profileModalButton = document.querySelector('.button--anketa');

const API_URL = '/api/application';

const openModal = () => {
    profileModal.style.display = 'block';
    profileModalCloseBtn.addEventListener('click', closeModal);
}

const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const validator = initValidate();
    if (!validator) {
        console.error('Failed to initialize form validation');
        return;
    }

    const isValid = await validator.revalidate();
    
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
        
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        closeModal();
        profileModalForm.reset();
        window.location.href = '/manage'

    } catch (error) {
        console.error('Error:', error);
    }
}

function closeModal () {
    profileModal.style.display = 'none';
    profileModalForm.reset();
    profileModalCloseBtn.removeEventListener('click', closeModal);
}

export const initProfileModal = () => {
    profileModalButton.addEventListener('click', openModal);
    profileModalForm.addEventListener('submit', onFormSubmit);
}