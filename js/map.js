export function initializeMap() {

    // Дожидаемся загрузки API и DOM
    ymaps.ready(() => {
        // Координаты пансионата
        const coordinates = [45.078245, 41.930779];
        
        // Проверяем наличие элемента карты
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            // Пробуем инициализировать карту через 1 секунду
            setTimeout(initializeMap, 1000);
            return;
        }
        
        try {
            // Создаем карту
            const map = new ymaps.Map('map', {
                center: coordinates,
                zoom: 15,
                controls: ['zoomControl', 'fullscreenControl']
            });

            // Создаем метку
            const placemark = new ymaps.Placemark(coordinates, {
                balloonContent: 'Опека'
            }, {
                preset: 'islands#redDotIcon'
            });

            // Добавляем метку на карту
            map.geoObjects.add(placemark);

            // Отключаем скролл карты до клика на ней
            map.behaviors.disable('scrollZoom');
            map.events.add('click', function() {
                map.behaviors.enable('scrollZoom');
            });
        } catch (error) {
            // Пробуем инициализировать карту через 1 секунду
            setTimeout(initializeMap, 1000);
        }
    });
}