export function initializeMap() {

    // Дожидаемся загрузки API и DOM
    ymaps.ready(() => {
        console.log('API Яндекс.Карт загружен');
        
        // Координаты пансионата
        const coordinates = [45.078245, 41.930779];
        console.log('Координаты:', coordinates);
        
        // Проверяем наличие элемента карты
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('Элемент карты не найден');
            // Пробуем инициализировать карту через 1 секунду
            setTimeout(initializeMap, 1000);
            return;
        }
        
        try {
            // Создаем карту
            const map = new ymaps.Map('map', {
                center: coordinates,
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl']
            });

            // Создаем метку
            const placemark = new ymaps.Placemark(coordinates, {
                balloonContent: 'Пансионат "Опека"<br>проспект Кулакова 28Б/3',
                hintContent: 'Пансионат "Опека"'
            }, {
                preset: 'islands#redHomeIcon'
            });

            // Добавляем метку на карту
            map.geoObjects.add(placemark);
            console.log('Метка добавлена на карту');

            // Отключаем скролл карты до клика на ней
            map.behaviors.disable('scrollZoom');
            map.events.add('click', function() {
                map.behaviors.enable('scrollZoom');
            });
        } catch (error) {
            console.error('Ошибка при создании карты:', error);
            // Пробуем инициализировать карту через 1 секунду
            setTimeout(initializeMap, 1000);
        }
    });
}