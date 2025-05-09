import { initValidateCallback } from './validate.js';

const modalCloseBtn = document.querySelector('.modal__close');
const modal = document.querySelector('.modal__overlay');
const sliderButtons = document.querySelectorAll('.button__slider');
const form = document.querySelector('.modal__form');

const API_URL = '/api/callback';

function openModalView() {
    modal.style.display = 'block';
    modalCloseBtn.addEventListener('click', closeModalView);
}

function closeModalView() {
    modal.style.display = 'none';
    form.reset();
    modalCloseBtn.removeEventListener('click', closeModalView);
}

const formatFormData = (formData) => {
    const formDataObj = {};
    formData.forEach((value, key) => {
        // Для чекбоксов (согласие с обработкой данных)
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
        
        // Показываем сообщение об успехе
        alert('Спасибо! Ваша заявка принята.');
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    }
}

export const initModal = () => {
    if (!modal || !modalCloseBtn || !form) {
        console.error('Modal elements not found');
        return;
    }

    sliderButtons.forEach(button => {
        button.addEventListener('click', openModalView);
    });

    form.addEventListener('submit', onFormSubmit);
}



