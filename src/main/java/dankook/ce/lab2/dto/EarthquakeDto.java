package dankook.ce.lab2.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// 지진 데이터를 담는 DTO (Data Transfer Object) 클래스
public class EarthquakeDto {
    @Getter @Setter private String time; // 지진 발생 시간 (예: "2024. 04. 09. 오후 04:14:00 KST")
    @Getter @Setter private String location; // 지진 발생 위치
    @Getter @Setter private double magnitude; // 지진 규모
    @Getter @Setter private String url; // 지진 정보 URL (정보가 있는 경우)
    @Getter @Setter private double latitude; // 지진 발생 위도
    @Getter @Setter private double longitude; // 지진 발생 경도

    // JSON 문자열로부터 지진 데이터 목록을 추출하는 메소드
    public static List<EarthquakeDto> parseEarthquakeData(String jsonStr) {
        // 지진 목록을 담을 리스트
        List<EarthquakeDto> earthquakes = new ArrayList<>();
        // JSON 문자열을 파싱하여 JSONObject 객체 생성
        JSONObject jsonObj = new JSONObject(jsonStr);
        // "features" 배열 추출
        JSONArray features = jsonObj.getJSONArray("features");
        // features 배열의 각 요소 (지진 정보)를 반복 처리
        for (int i = 0; i < features.length(); i++) {
            JSONObject feature = features.getJSONObject(i);
            // "properties" 및 "geometry" 객체 추출
            JSONObject properties = feature.getJSONObject("properties");
            JSONObject geometry = feature.getJSONObject("geometry");
            // "coordinates" 배열 추출
            JSONArray coordinates = geometry.getJSONArray("coordinates");
            // 경도 및 위도 추출
            double longitude = coordinates.getDouble(0); // 첫 번째 요소는 경도
            double latitude = coordinates.getDouble(1); // 두 번째 요소는 위도
            // "time" 필드 추출 및 가독성 있는 형식으로 변환
            long timeInMillis = properties.getLong("time");
            String readableTime = new SimpleDateFormat("yyyy. MM. dd. '오후' HH:mm:ss z").format(new Date(timeInMillis));
            // 지진 정보 객체 생성
            EarthquakeDto dto = new EarthquakeDto(
                    readableTime,
                    properties.getString("place"),
                    properties.getDouble("mag"),
                    properties.getString("url"),
                    latitude,
                    longitude
            );
            // 지진 정보 목록에 추가
            earthquakes.add(dto);
        }
        // 지진 정보 목록 반환
        return earthquakes;
    }
}
