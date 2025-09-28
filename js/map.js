export function initializeMap() {
    ymaps.ready(() => {
        const coordinates = [45.078245, 41.930779];
        
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            setTimeout(initializeMap, 1000);
            return;
        }
        
        try {

            const map = new ymaps.Map('map', {
                center: coordinates,
                zoom: 15,
                controls: ['zoomControl', 'fullscreenControl']
            });


            const placemark = new ymaps.Placemark(coordinates, {
                balloonContent: 'Опека'
            }, {
                preset: 'islands#redDotIcon'
            });

            map.geoObjects.add(placemark);

            map.behaviors.disable('scrollZoom');
            map.events.add('click', function() {
                map.behaviors.enable('scrollZoom');
            });
        } catch (error) {
            setTimeout(initializeMap, 1000);
        }
    });
}