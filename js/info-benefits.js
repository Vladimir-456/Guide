import { texts } from "./const";

const getBenifitTitle = (benefit) => {
  const titleElement = benefit.querySelector('h3') || benefit.querySelector('.benefit-title');
  return titleElement ? titleElement.textContent.trim() : '';
}

const createBenefitInfo = (className) => {
  infoElement.classList.add(className);
  const info = document.createElement('p');
  info.textContent = texts[title];
  info.style.textAlign = 'center';
  info.style.fontSize = '14px';
  info.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
  info.style.padding = '20px';
  info.style.borderRadius = '10px';

  infoElement.appendChild(info);
  return infoElement;
}

const showBenefitInfo = (benefit) => {
  benefit.classList.add('active');
  const title = getBenifitTitle(benefit);
  if (texts[title] && !benefit.querySelector('.benefit-info')) {
      createBenefitInfo('benefit-info');
  }
}

const hideBenefitInfo = (benefit) => {
  benefit.classList.remove('active');
  
  const infoElement = benefit.querySelector('.benefit-info');
  if (infoElement) {
    infoElement.classList.add('hiding');

    setTimeout(() => {
      infoElement.remove();
    }, 300);
  }
}

function handleMouseEnter(evt) {
   const benifit = evt.target.closest('.benefit-item');
   if (benifit) {
      showBenefitInfo(benifit);
   }
  }
  
  function handleMouseLeave(benefit) {
    const benefit = e.target.closest('.benefit-item');
    if (benefit) {
      hideBenefitInfo(benefit);
    }
  }
  
export const initBenefitHoverEffects = () =>{
  const container = document.querySelector('.benefits-container');
  console.log(container);

  container.addEventListener('mouseenter', handleMouseEnter);
  
  container.addEventListener('mouseleave', handleMouseLeave);
  
}