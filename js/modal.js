const modalCloseBtn = document.querySelector('.modal__close');
const modal = document.querySelector('.modal__overlay');
const sliderButtons = document.querySelectorAll('.button__slider');
const form = document.querySelector('.modal__form');

const API_URL = '/api/callback';

function openModalView () {
    modal.style.display = 'block';
    modalCloseBtn.addEventListener('click', closeModalView);
}

function closeModalView () {
    modal.style.display = 'none';
    form.reset();
    modalCloseBtn.removeEventListener('click', closeModalView);
}
const formatedData = (data) => {
  data.forEach((value, key) => {
    // Для чекбоксов (согласие с обработкой данных)
    if (key === 'agreement' || key === 'newsletter') {
        formDataObj[key] = value === 'on' || value === 'true';
    } else {
        formDataObj[key] = value;
    }
});
}
const onFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const formDataObj = {};
  formData.forEach((value, key) => {
    // Для чекбоксов (согласие с обработкой данных)
    if (key === 'agreement' || key === 'newsletter') {
        formDataObj[key] = value === 'on' || value === 'true';
    } else {
        formDataObj[key] = value;
    }
  });
  console.log(formDataObj);
  // formatedData(formData);
  fetch(API_URL , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
  },
    body: JSON.stringify(formDataObj)
  })
  .then(response => {
    if (response.ok) {
      closeModalView();
      form.reset();
    }
    else {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error(error);
  });
}

export const initModal = () => {
  sliderButtons.forEach(button => {
    button.addEventListener('click', openModalView);
});
form.addEventListener('submit', (evt) => onFormSubmit(evt));
}



