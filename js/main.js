import { setupSlider } from './slider.js';
import { initModal } from './modal.js';
import { initializeMap } from './map.js';
import { initProfileModal } from './questionnaire.js';
import { initValidate } from './validate.js';

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('fade-in') || 
                    entry.target.classList.contains('fade-in-left') || 
                    entry.target.classList.contains('fade-in-right') || 
                    entry.target.classList.contains('wave-in')) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
                
                if (entry.target.classList.contains('lazy') && entry.intersectionRatio >= 0.5) {
                    const img = entry.target;
                    
                    img.classList.add('loading');
                    
                    const tempImg = new Image();
                    tempImg.src = img.dataset.src;
                    
                    tempImg.onload = () => {
                        img.src = img.dataset.src;
                        img.removeAttribute("data-src");
                        img.classList.remove("lazy", "loading", "lazy-placeholder");
                        img.classList.add("loaded");
                        observer.unobserve(img);
                    };
                    
                    tempImg.onerror = () => {
                        img.classList.remove("loading", "lazy-placeholder");
                        img.classList.add("error");
                    };
                }
            }
        });
    }, {
        root: null,
        rootMargin: '50px',
        threshold: [0.15, 0.5] 
    });

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .wave-in');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach(img => {
        if (!img.classList.contains('lazy-placeholder')) {
            img.classList.add('lazy-placeholder');
        }
        observer.observe(img);
    });

    const pensionCard = document.querySelectorAll('.pension-card');
    pensionCard.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    setupSlider();
    initializeMap();
    initModal();
    initProfileModal();
    initValidate();
});