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
public class EarthquakeDto {
    private String time;
    private String location;
    private double magnitude;
    private String url;
    private double latitude; // 위도
    private double longitude; // 경도

    // JSON 문자열에서 EarthquakeDTO 객체 리스트로 변환하는 메소드
    public static List<EarthquakeDto> parseEarthquakeData(String jsonStr) {
        List<EarthquakeDto> earthquakes = new ArrayList<>();
        JSONObject jsonObj = new JSONObject(jsonStr);
        JSONArray features = jsonObj.getJSONArray("features");

        for (int i = 0; i < features.length(); i++) {
            JSONObject feature = features.getJSONObject(i);
            JSONObject properties = feature.getJSONObject("properties");
            JSONObject geometry = feature.getJSONObject("geometry");
            JSONArray coordinates = geometry.getJSONArray("coordinates");

            // geometry 필드에서 경도와 위도를 추출합니다.
            double longitude = coordinates.getDouble(0); // 첫 번째 요소가 경도입니다.
            double latitude = coordinates.getDouble(1); // 두 번째 요소가 위도입니다.

            long timeInMillis = properties.getLong("time");
            String readableTime = new SimpleDateFormat("yyyy. MM. dd. 'at' HH:mm:ss z").format(new Date(timeInMillis));

            EarthquakeDto dto = new EarthquakeDto(
                    readableTime,
                    properties.getString("place"),
                    properties.getDouble("mag"),
                    properties.getString("url"),
                    latitude,
                    longitude
            );

            earthquakes.add(dto);
        }
        return earthquakes;
    }
}
