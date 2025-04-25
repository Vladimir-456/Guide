export const initializeMap = () => {
    ymaps.ready(() => {
      const map = new ymaps.Map('map', {
        center: [45.078645, 41.929853],
        zoom: 16
      });
      
      // Создаем метку с информацией об организации
      const organizationPlacemark = new ymaps.Placemark([45.078645, 41.929853], {
        balloonContentHeader: 'Опека',
        balloonContentBody: `
          <p>Телефон: +7 (933) 181-02-35</p>
          <p>Режим работы: Пн-Пт 9:00-18:00</p>
        `,
        hintContent: 'Опека'
      }, {
        // Используем свою иконку для метки
        iconLayout: 'default#image',
        iconImageHref: '../img/map-edit.jpg', // Путь к изображению иконки
        iconImageSize: [30, 30],      // Размер иконки
        iconImageBorderRadius: 50,
        iconImageOffset: [-16, -15]   // Смещение иконки
      });
      
      // Добавляем метку на карту
      map.geoObjects.add(organizationPlacemark);
      
      // Опционально: открываем балун с информацией
      // organizationPlacemark.balloon.open();
    });
  }