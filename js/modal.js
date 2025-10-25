import { initValidateCallback } from './validate.js';
import { lockScroll, unlockScroll } from "./utils.js";
import { API_URL } from './const.js';

const modalCloseBtn = document.querySelector('.modal__close');
const modalOverlay = document.querySelector('.modal__overlay');
const sliderButtons = document.querySelectorAll('.button__slider');
const form = document.querySelector('.modal__form');

function openModalView() {
    modalOverlay.style.display = 'block';
    lockScroll();
    modalCloseBtn.addEventListener('click', closeModalView);
}

function closeModalView() {
    modalOverlay.style.display = 'none';
    form.reset();
    unlockScroll();
    modalCloseBtn.removeEventListener('click', closeModalView);
}

const formatFormData = (formData) => {
    const formDataObj = {};
    formData.forEach((value, key) => {
        if (key === 'agreement' || key === 'newsletter') {
            formDataObj[key] = value === 'on' || value === 'true';
        } else {
            formDataObj[key] = value;
        }
    });
    return formDataObj;
}

const onFormSubmit = async (evt) => {
    evt.preventDefault();
    const validator = initValidateCallback();
    const isValid = await validator.revalidate();
    if (!isValid) {
        return;
    }
    
    try {
        const formData = new FormData(evt.target);
        const formDataObj = formatFormData(formData);
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        closeModalView();
        form.reset();
        window.location.href = '/manage'
        
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    }
}

export const initModal = () => {

    sliderButtons.forEach(button => {
        button.addEventListener('click', openModalView);
    });

    form.addEventListener('submit', onFormSubmit);
}



