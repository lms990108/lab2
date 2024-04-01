let earthquakes; // earthquakes 변수를 전역 변수로 정의합니다.
let map; // 지도 객체를 저장할 전역 변수 추가

// 지도 초기화 함수
function initMap() {
    map = L.map('mapid').setView([20.0, 0.0], 2); // 지도의 초기 위치와 줌 레벨 설정
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

document.addEventListener("DOMContentLoaded", function() {
    initMap(); // 문서 로드 시 지도를 초기화합니다.
    // 초기 데이터 불러오기. 여기서 'time'은 기본 정렬 옵션입니다.
    var year = document.getElementById("year").value;
    var minMagnitude = document.getElementById("magnitude").value;
    var orderBy = document.getElementById("orderBy") ? document.getElementById("orderBy").value : 'time';
    fetchData(year, minMagnitude, orderBy);
});

// 폼 제출 이벤트 핸들러
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var year = document.getElementById("year").value;
    var minMagnitude = document.getElementById("magnitude").value;
    var orderBy = document.getElementById("orderBy").value;
    fetchData(year, minMagnitude, orderBy);
});

// 데이터 조회 및 처리 함수
function fetchData(year, minMagnitude, orderBy) {
    fetch(`/api/earthquakes?year=${year}&minMagnitude=${minMagnitude}&orderBy=${orderBy}`)
        .then(response => response.json())
        .then(data => {
            earthquakes = data; // 받은 데이터를 earthquakes 변수에 저장합니다.
            updateMapAndTable(data); // 지도와 테이블 업데이트
        })
        .catch(error => console.error('Error fetching earthquake data:', error));
}

// 지도와 테이블 업데이트 함수
function updateMapAndTable(data) {
    if (!map) return; // 지도가 아직 초기화되지 않았다면 함수 종료
    map.eachLayer(function(layer) {
        if (!!layer.toGeoJSON) {
            map.removeLayer(layer); // 기존 마커 제거
        }
    });
    data.forEach(function(eq) {
        var marker = L.marker([eq.latitude, eq.longitude]).addTo(map);
        var popupContent = `Magnitude: ${eq.magnitude}<br>Location: ${eq.location}<br><a href='${eq.url}' target='_blank'>View Details</a>`;
        marker.bindPopup(popupContent);
    });
    refreshTable(data); // 테이블 데이터 업데이트
}

// 테이블 데이터 업데이트 함수
function refreshTable(data) {
    var tableBody = document.getElementById('earthquakeData');
    tableBody.innerHTML = ''; // 테이블 내용 초기화
    data.forEach(function(eq) {
        var row = document.createElement('tr');
        row.innerHTML = `<td>${eq.time}</td><td>${eq.location}</td><td>${eq.magnitude}</td><td>${eq.latitude}</td><td>${eq.longitude}</td><td><a href="${eq.url}" target="_blank">상세정보 보기</a></td>`;
        tableBody.appendChild(row);
    });
}
