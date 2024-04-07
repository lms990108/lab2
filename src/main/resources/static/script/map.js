export let map; // 지도 객체를 저장할 전역 변수
export let earthquake; // 지진 데이터를 저장할 전역 변수
export let volcano; // 화산 데이터를 저장할 전역 변수

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

// 지도에 지진 데이터를 표시하는 함수
export function fetchToMap(year = 2024, minMagnitude = 7.0, orderBy = 'time') {
    fetch(`/api/earthquakes?year=${year}&minMagnitude=${minMagnitude}&orderBy=${orderBy}`)
        .then(response => response.json())
        .then(data => {
            earthquake = data;
            console.log(`year = ${year}, minMag = ${minMagnitude}`)
            console.log('Earthquake 데이터:', data);
            data.forEach(earthquake => {
                if (earthquake.latitude && earthquake.longitude) {
                    L.marker([earthquake.latitude, earthquake.longitude]).addTo(map)
                        .bindPopup(`Magnitude: ${earthquake.magnitude}<br>Location: ${earthquake.location}`);
                }
            });
        })
        .catch(error => console.error('Error fetching earthquake data:', error));
}

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


