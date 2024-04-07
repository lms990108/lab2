export let volcano; // 화산 데이터를 저장할 전역 변수
import { map } from './map.js';

// 화산 데이터 조회 및 처리 함수
export function fetchVolcanoes() {
    console.log(`fetchVolcanoes 호출됨`);
    fetch(`/api/volcanoes`)
        .then(response => response.json())
        .then(data => {
            volcano = data; // 받은 데이터를 volcanoes 변수에 저장합니다.
            console.log('volcano 데이터:', data);
            // Correct the property names and display relevant info
            data.forEach(volcano => {
                if(volcano.lat && volcano.lng) {
                    L.marker([volcano.lat, volcano.lng]).addTo(map)
                        .bindPopup(`Volcano Name: ${volcano.volcanoName}<br>Elevation: ${volcano.elevM}m`);
                }
            });
        })
        .catch(error => console.error('Error fetching volcano data:', error));
}
