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
    private String vnum;
    private String volcanoName;
    private double lat;
    private double lng;
    private int elevM;
    private String color;
    private String obsAbbr;

    public static List<VolcanoDto> parseVolcanoData(String jsonStr) {
        List<VolcanoDto> volcanoes = new ArrayList<>();
        JSONArray jsonArray = new JSONArray(jsonStr);

        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject obj = jsonArray.getJSONObject(i);
            VolcanoDto dto = new VolcanoDto();
            dto.setVnum(obj.optString("vnum"));
            dto.setVolcanoName(obj.optString("vn"));
            dto.setLat(obj.optDouble("lat"));
            dto.setLng(obj.optDouble("lng"));
            dto.setElevM(obj.optInt("elevM"));
            dto.setColor(obj.optString("color"));
            dto.setObsAbbr(obj.optString("obsAbbr"));

            volcanoes.add(dto);
        }
        return volcanoes;
    }
}
