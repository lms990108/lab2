export let earthquake; // earthquake 변수를 전역 변수로 정의합니다.
import { map } from './map.js';

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

// 테이블에 지진 데이터를 표시하는 함수
export function fetchToTable(year = 2024, minMagnitude = 7.0, orderBy = 'time') {
    fetch(`/api/earthquakes?year=${year}&minMagnitude=${minMagnitude}&orderBy=${orderBy}`)
        .then(response => response.json())
        .then(data => {
            earthquake = data;
            console.log('Earthquake 데이터:', data);
            displayEarthquakeTable(data); // 데이터를 테이블에 표시하는 별도의 함수 호출
        })
        .catch(error => console.error('Error fetching earthquake data:', error));
}

// 지진 데이터를 웹 페이지에 테이블로 표시하는 함수
export function displayEarthquakeTable(earthquakes) {
    let html = `<table>
        <tr>
            <th>Time</th>
            <th>Location</th>
            <th>Magnitude</th>
            <th>Details</th>
        </tr>`;

    earthquakes.forEach(eq => {
        html += `
            <tr>
                <td>${eq.time}</td>
                <td>${eq.location}</td>
                <td>${eq.magnitude}</td>
                <td><a href="${eq.url}" target="_blank">More Info</a></td>
            </tr>`;
    });

    html += `</table>`;

    // 테이블 HTML을 'earthquake-table-container' div에 삽입합니다.
    document.querySelector('.earthquake-table-container').innerHTML = html;
}
