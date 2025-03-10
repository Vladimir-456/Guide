const texts = {
    'Заслуженное доверие': 'У нас есть все необходимые лицензии на осуществление медицинской деятельности, мы входим в государственный реестр поставщиков социальных услуг.',
    'Член общества РАН': 'Наши методики одобрены Российской академией наук, мы регулярно проводим исследования и внедряем инновационные подходы в области гериатрии.',
    'Индивидуальный уход': 'Для каждого постояльца разрабатывается индивидуальная программа ухода, учитывающая все особенности здоровья и личные предпочтения.',
    'Восстановление здоровья': 'Мы предлагаем полный комплекс медицинских и реабилитационных услуг, включая физиотерапию, ЛФК и занятия с профессиональными реабилитологами.',
    'Психологическая поддержка': 'В нашей команде работают опытные психологи, которые помогают адаптироваться к новым условиям и поддерживают позитивный эмоциональный настрой.'
};

const benefits = document.querySelectorAll('.benefit-item');


benefits.forEach(benefit => {
    // Обработчик для наведения мыши (показ информации)
    benefit.addEventListener('mouseenter', () => {
        benefit.classList.add('active');
        benefit.querySelector('.benefit-underline').style.width = '100%';
        
        const titleElement = benefit.querySelector('h3') || benefit.querySelector('.benefit-title');
        const title = titleElement ? titleElement.textContent.trim() : '';
        
        if(title in texts && !benefit.querySelector('.benefit-info')) {
            const infoElement = document.createElement('div');
            infoElement.classList.add('benefit-info');
            const info = document.createElement('p');
            info.textContent = texts[title];
            info.style.textAlign = 'center';
            info.style.fontSize = '14px';
            info.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
            info.style.padding = '20px';
            info.style.borderRadius = '10px';
            
            infoElement.appendChild(info);
            benefit.appendChild(infoElement);
        }
    });
    
    // Обработчик для ухода мыши (скрытие информации)
    benefit.addEventListener('mouseleave', () => {
        benefit.classList.remove('active');
        benefit.querySelector('.benefit-underline').style.width = '50px';
        
        const infoElement = benefit.querySelector('.benefit-info');
        if(infoElement) {
            infoElement.style.transition = 'all 0.5s ease';
            infoElement.style.maxHeight = '0';
            infoElement.style.opacity = '0';
            
            setTimeout(() => {
                if (infoElement && infoElement.parentNode === benefit) {
                    benefit.removeChild(infoElement);
                }
            }, 300); // Уменьшил время ожидания для более быстрого реагирования
        }
    });
});