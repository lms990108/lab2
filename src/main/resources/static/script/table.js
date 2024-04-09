export let earthquake; // 전역 변수 earthquake를 선언합니다. 이 변수는 지진 데이터를 저장하기 위해 사용됩니다.

// 지진 데이터를 가져와서 테이블로 표시하는 함수입니다.
export function fetchEarthquakesToTable(year = 2024, minMagnitude = 7.0, orderBy = 'time') {
    fetch(`/api/earthquakes?year=${year}&minMagnitude=${minMagnitude}&orderBy=${orderBy}`) // 지진 데이터 API 호출
        .then(response => response.json()) // 응답을 JSON 형태로 변환
        .then(data => {
            earthquake = data; // 변환된 데이터를 전역 변수 earthquake에 저장
            console.log('Earthquake 데이터:', data); // 콘솔에 지진 데이터 로그 출력
            displayEarthquakeTable(data); // 지진 데이터를 테이블 형태로 표시하는 함수 호출
        })
        .catch(error => console.error('Error fetching earthquake data:', error)); // 에러 발생 시 콘솔에 에러 메시지 출력
}

// 지진 데이터를 웹 페이지의 테이블로 표시하는 함수입니다.
export function displayEarthquakeTable(earthquakes) {
    let html = `<table>
        <tr>
            <th>Time</th>
            <th>Location</th>
            <th>Magnitude</th>
            <th>Details</th>
        </tr>`; // 테이블 헤더 생성

    earthquakes.forEach(eq => {
        html += `
            <tr>
                <td>${eq.time}</td>
                <td>${eq.location}</td>
                <td>${eq.magnitude}</td>
                <td><a href="${eq.url}" target="_blank">More Info</a></td>
            </tr>`; // 각 지진 데이터에 대한 행 추가
    });

    html += `</table>`; // HTML 테이블 닫기

    document.querySelector('.earthquake-table-container').innerHTML = html; // 생성된 HTML을 웹 페이지의 지정된 위치에 삽입
}

// 화산 데이터를 가져와서 테이블로 표시하는 함수입니다.
export function fetchVolcanoesToTable() {
    fetch('/api/volcanoes') // 화산 데이터 API 호출
        .then(response => response.json()) // 응답을 JSON 형태로 변환
        .then(data => {
            console.log('Volcano 데이터:', data); // 콘솔에 화산 데이터 로그 출력
            displayVolcanoTable(data); // 화산 데이터를 테이블 형태로 표시하는 함수 호출
        })
        .catch(error => console.error('Error fetching volcano data:', error)); // 에러 발생 시 콘솔에 에러 메시지 출력
}

// 화산 데이터를 웹 페이지의 테이블로 표시하는 함수입니다.
function displayVolcanoTable(volcanoes) {
    let html = `<table>
        <tr>
            <th>Volcano Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Elevation (m)</th>
            <th>Observatory</th>
        </tr>`; // 테이블 헤더 생성

    volcanoes.forEach(volcano => {
        html += `
            <tr>
                <td>${volcano.volcanoName}</td>
                <td>${volcano.lat}</td>
                <td>${volcano.lng}</td>
                <td>${volcano.elevM}</td>
                <td>${volcano.obsAbbr}</td>
            </tr>`; // 각 화산 데이터에 대한 행 추가
    });

    html += `</table>`; // HTML 테이블 닫기

    document.querySelector('.volcano-table-container').innerHTML = html; // 생성된 HTML을 웹 페이지의 지정된 위치에 삽입
}
