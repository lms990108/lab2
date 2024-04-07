import { fetchToMap } from './earthquakes.js';
import { fetchVolcanoes } from './volcanoes.js';

export let map; // 지도 객체를 저장할 전역 변수

// 지도 초기화 함수
export function initMap() {
    if (map != undefined) { map.remove(); }
    map = L.map('mapid').setView([20.0, 0.0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    console.log("initmap 호출")
}

// 모든 마커를 지도에서 제거하는 함수
export function clearAllMarkers() {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    console.log("clear 호출")
}

document.addEventListener("DOMContentLoaded", function() {
    initMap(); // 문서 로드 시 지도를 초기화합니다.
});

// "Show Earthquakes" 버튼 이벤트 핸들러
// 이벤트 리스너 내에서 사용자 입력을 받아 fetchToMap에 전달합니다.
document.getElementById('showEarthquakes').addEventListener('click', function() {
    // 입력값을 가져옵니다.
    const year = document.getElementById('year').value;
    const minMagnitude = document.getElementById('minMagnitude').value;

    // 지도 초기화
    initMap();

    // 지진 데이터를 불러옵니다. 사용자 입력값을 매개변수로 전달합니다.
    fetchToMap(year, minMagnitude);
});


// "Show Volcanoes" 버튼 이벤트 핸들러
document.getElementById('showVolcanoes').addEventListener('click', function() {
    initMap(); // 지도 초기화
    fetchVolcanoes(); // 화산 데이터를 불러옵니다.
});

// "Clear All Markers" 버튼 이벤트 핸들러
document.getElementById('clearMarkers').addEventListener('click', function() {
    clearAllMarkers(); // 모든 마커 제거 함수 호출
});
