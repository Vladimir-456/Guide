document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.header__nav');
    const burger = document.createElement('div');
    burger.classList.add('burger-menu');
    burger.innerHTML = `
        <span></span>    
        <span></span>    
        <span></span>    
    `;
    header.insertBefore(burger, nav);

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.classList.add('menu-open');
    });
});
 // Закрывать меню при клике на пункт меню на мобильных устройствах
 const navLinks = document.querySelectorAll('.header__link');
 navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth < 768) {
            nav.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('menu-open');
    }
    });
});

 // Обработка выпадающего подменю на мобильных устройствах



 //
 window.addEventListener('resize', () => {
    if(window.innerWidth > 768) {
        nav.classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});