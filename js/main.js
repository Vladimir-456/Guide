import { setupSlider } from './slider.js';
import { initModal } from './modal.js';
import { initializeMap } from './map.js';
import { initProfileModal } from './questionnaire.js';
import { initValidate } from './validate.js';
import { initReviewModal } from './yandex-reviews-modal.js';
import { setupIntesectionObserver } from './observer.js';

document.addEventListener('DOMContentLoaded', () => {
    setupIntesectionObserver();
    setupSlider();
    initializeMap();
    initModal();
    initProfileModal();
    initReviewModal();
    initValidate();
});