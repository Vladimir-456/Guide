
const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.targe.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}
export const setupIntesectionObserver = () => {
    const animateElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    }
    const observer = new IntersectionObserver(handleIntersect, options);

    animateElements.forEach(element => {
        observer.observe(element);
    });
}