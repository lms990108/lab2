var earthquakes; // earthquakes 변수를 전역 변수로 정의합니다.

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var year = document.getElementById("year").value;
    var minMagnitude = document.getElementById("magnitude").value;
    fetchData(year, minMagnitude);
});

document.getElementById("sortByTime").addEventListener("click", function() {
    sortByTime();
});

document.getElementById("sortByMagnitude").addEventListener("click", function() {
    sortByMagnitude();
});

function fetchData(year, minMagnitude) {
    fetch('/earthquakes?year=' + year + '&minMagnitude=' + minMagnitude)
        .then(response => response.json())
        .then(data => {
            earthquakes = data; // 받은 데이터를 earthquakes 변수에 저장합니다.
            updateMapAndTable(data);
            console.log("fetchTest")
        })
        .catch(error => console.error('Error fetching earthquake data:', error));
}

function updateMapAndTable(data) {
    // 데이터를 받아서 지도와 테이블을 업데이트하는 로직을 작성합니다.
    // 예시: 마커를 추가하고 테이블을 업데이트합니다.
    data.forEach(function(eq) {
        var marker = L.marker([eq.latitude, eq.longitude]).addTo(map);
        var popupContent = "Magnitude: " + eq.magnitude +
            "<br>Location: " + eq.location +
            "<br><a href='" + eq.url + "' target='_blank'>View Details</a>";
        marker.bindPopup(popupContent);
    });
    refreshTable(data);
}

function refreshTable(data) {
    var tableBody = document.getElementById('earthquakeData');
    tableBody.innerHTML = ''; // 테이블 내용 초기화
    data.forEach(function(eq) {
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + eq.time + '</td>' +
            '<td>' + eq.location + '</td>' +
            '<td>' + eq.magnitude + '</td>' +
            '<td>' + eq.latitude + '</td>' +
            '<td>' + eq.longitude + '</td>' +
            '<td><a href="' + eq.url + '" target="_blank">상세정보 보기</a></td>';
        tableBody.appendChild(row); // 테이블에 추가
    });
}

function sortByTime() {
    // 시간으로 정렬하는 로직
    earthquakes.sort(function(a, b) {
        return new Date(a.time) - new Date(b.time);
    });
    // 정렬 후 테이블을 업데이트합니다.
    refreshTable(earthquakes);
}

function sortByMagnitude() {
    // 규모로 정렬하는 로직
    earthquakes.sort(function(a, b) {
        return a.magnitude - b.magnitude;
    });
    // 정렬 후 테이블을 업데이트합니다.
    refreshTable(earthquakes);
}
