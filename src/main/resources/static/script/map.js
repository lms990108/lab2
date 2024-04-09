// 전역 변수 선언 부분: 지도, 지진 데이터, 화산 데이터를 저장하기 위한 변수들을 선언합니다.
export let map; // 지도 객체를 저장할 전역 변수
export let earthquake; // 지진 데이터를 저장할 전역 변수
export let volcano; // 화산 데이터를 저장할 전역 변수

// 지도 초기화 함수: 지도를 생성하고 기본 설정을 수행합니다.
export function initMap() {
    if (map != undefined) { map.remove(); } // 지도가 이미 정의된 경우, 기존 지도를 제거합니다.
    map = L.map('mapid').setView([20.0, 0.0], 2); // 지도 객체를 생성하고, 초기 보기 위치와 줌 레벨을 설정합니다.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // OpenStreetMap 타일 레이어를 추가합니다.
        maxZoom: 18, // 최대 줌 레벨 설정
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); // 지도에 타일 레이어를 추가합니다.
    console.log("initmap 호출") // 콘솔에 로그 출력
}

// 모든 마커를 지도에서 제거하는 함수
export function clearAllMarkers() {
    map.eachLayer(function(layer) { // 지도의 모든 레이어를 순회합니다.
        if (layer instanceof L.Marker) { // 레이어가 마커인 경우
            map.removeLayer(layer); // 해당 마커를 지도에서 제거합니다.
        }
    });
    console.log("clear 호출") // 콘솔에 로그 출력
}

// 지도에 지진 데이터를 표시하는 함수: API로부터 지진 데이터를 가져와 지도에 마커로 표시합니다.
export function fetchToMap(year = 2024, minMagnitude = 7.0, orderBy = 'time') {
    fetch(`/api/earthquakes?year=${year}&minMagnitude=${minMagnitude}&orderBy=${orderBy}`) // 지진 데이터 API 호출
        .then(response => response.json()) // 응답을 JSON으로 변환
        .then(data => { // 데이터 처리
            earthquake = data; // 받은 데이터를 earthquake 변수에 저장합니다.
            console.log(`year = ${year}, minMag = ${minMagnitude}`) // 콘솔에 로그 출력
            console.log('Earthquake 데이터:', data); // 콘솔에 데이터 로그 출력
            data.forEach(earthquake => { // 받은 데이터 각 항목에 대해 반복
                if (earthquake.latitude && earthquake.longitude) { // 위도와 경도 정보가 있는 경우
                    L.marker([earthquake.latitude, earthquake.longitude]).addTo(map) // 마커를 지도에 추가
                        .bindPopup(`Magnitude: ${earthquake.magnitude}<br>Location: ${earthquake.location}`); // 마커 클릭 시 표시될 팝업 정보 바인딩
                }
            });
        })
        .catch(error => console.error('Error fetching earthquake data:', error)); // 데이터 가져오기 실패 시 콘솔에 에러 로그 출력
}

// 화산 데이터 조회 및 처리 함수: API로부터 화산 데이터를 가져와 지도에 마커로 표시합니다.
export function fetchVolcanoes() {
    console.log(`fetchVolcanoes 호출됨`); // 콘솔에 로그 출력
    fetch(`/api/volcanoes`) // 화산 데이터 API 호출
        .then(response => response.json()) // 응답을 JSON으로 변환
        .then(data => {
            volcano = data; // 받은 데이터를 volcano 변수에 저장합니다.
            console.log('volcano 데이터:', data); // 콘솔에 데이터 로그 출력
            // 받은 데이터 각 항목에 대해 반복
            data.forEach(volcano => {
                if(volcano.lat && volcano.lng) { // 위도와 경도 정보가 있는 경우
                    L.marker([volcano.lat, volcano.lng]).addTo(map) // 마커를 지도에 추가
                        .bindPopup(`Volcano Name: ${volcano.volcanoName}<br>Elevation: ${volcano.elevM}m`); // 마커 클릭 시 표시될 팝업 정보 바인딩
                }
            });
        })
        .catch(error => console.error('Error fetching volcano data:', error)); // 데이터 가져오기 실패 시 콘솔에 에러 로그 출력
}

// 문서 로드 완료 이벤트 리스너: 문서가 완전히 로드되면 지도를 초기화합니다.
document.addEventListener("DOMContentLoaded", function() {
    initMap(); // 문서 로드 시 지도를 초기화합니다.
});

// "Show Earthquakes" 버튼 클릭 이벤트 핸들러
document.getElementById('showEarthquakes').addEventListener('click', function() {
    const year = document.getElementById('year').value; // 입력된 연도 값 가져오기
    const minMagnitude = document.getElementById('minMagnitude').value; // 입력된 최소 진도 값 가져오기

    initMap(); // 지도 초기화

    fetchToMap(year, minMagnitude); // 지진 데이터를 불러와 지도에 표시합니다.
});


// "Show Volcanoes" 버튼 클릭 이벤트 핸들러
document.getElementById('showVolcanoes').addEventListener('click', function() {
    initMap(); // 지도 초기화
    fetchVolcanoes(); // 화산 데이터를 불러와 지도에 표시합니다.
});

// "Clear All Markers" 버튼 클릭 이벤트 핸들러
document.getElementById('clearMarkers').addEventListener('click', function() {
    clearAllMarkers(); // 모든 마커를 지도에서 제거합니다.
});
