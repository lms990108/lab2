package dankook.ce.lab2.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VolcanoDto {
    private String vnum; // 화산 고유번호
    private String volcanoName; // 화산 이름
    private double lat; // 위도 (latitude)
    private double lng; // 경도 (longitude)
    private int elevM; // 해발 높이 (미터)
    private String color; // 화산 상태를 나타내는 색깔 코드
    private String obsAbbr; // 관측소 약어
    // JSON 문자열로부터 화산 데이터 목록을 추출하는 메소드
    public static List<VolcanoDto> parseVolcanoData(String jsonStr) {
        List<VolcanoDto> volcanoes = new ArrayList<>();
        // JSON 문자열을 파싱하여 JSONArray 객체 생성
        JSONArray jsonArray = new JSONArray(jsonStr);
        // JSONArray의 각 요소 (화산 정보)를 반복 처리
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject obj = jsonArray.getJSONObject(i);
            // VolcanoDto 객체 생성
            VolcanoDto dto = new VolcanoDto();
            // JSON 객체의 필드 값을 추출하여 VolcanoDto 객체에 설정
            dto.setVnum(obj.optString("vnum", null)); // "vnum" 필드가 없을 경우 null 값 설정 (optString 이용)
            dto.setVolcanoName(obj.optString("vn", null)); // "vn" 필드가 없을 경우 null 값 설정 (optString 이용)
            dto.setLat(obj.optDouble("lat", 0.0)); // "lat" 필드가 없거나 파싱 실패 시 기본값 0.0 설정 (optDouble 이용)
            dto.setLng(obj.optDouble("lng", 0.0)); // "lng" 필드가 없거나 파싱 실패 시 기본값 0.0 설정 (optDouble 이용)
            dto.setElevM(obj.optInt("elevM", 0)); // "elevM" 필드가 없거나 파싱 실패 시 기본값 0 설정 (optInt 이용)
            dto.setColor(obj.optString("color", null)); // "color" 필드가 없을 경우 null 값 설정 (optString 이용)
            dto.setObsAbbr(obj.optString("obsAbbr", null)); // "obsAbbr" 필드가 없을 경우 null 값 설정 (optString 이용)
            // 추출한 데이터로 생성된 VolcanoDto 객체를 목록에 추가
            volcanoes.add(dto);
        }
        // 화산 데이터 목록 반환
        return volcanoes;
    }
}
