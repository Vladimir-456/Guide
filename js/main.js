import { setupSlider } from "./slider.js";
import { initModal } from "./modal.js";
import { initializeMap } from "./map.js";
import { initProfileModal } from "./questionnaire.js";

document.addEventListener('DOMContentLoaded', () => {
     // Функция настройки обзервера для стандартных анимаций
  function setupIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .wave-in');
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Элемент будет считаться видимым при 15% видимости
    };
    
    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Прекращаем наблюдение после появления
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, options);
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
  setupIntersectionObserver();

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
});