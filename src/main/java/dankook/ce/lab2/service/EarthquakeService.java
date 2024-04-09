package dankook.ce.lab2.service;

import dankook.ce.lab2.dto.EarthquakeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Service
public class EarthquakeService {

    private final WebClient webClient;

    @Autowired
    public EarthquakeService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://earthquake.usgs.gov").build();
    }

    /**
     * 지진 데이터를 조회합니다.
     *
     * @param year 조회할 연도
     * @param minMagnitude 조회할 최소 규모
     * @param orderBy 정렬 기준 (예: time, magnitude) - 추가됨
     * @return 조회된 지진 데이터 목록 (Flux<EarthquakeDto>) - 반환 타입 수정
     */
    public Flux<EarthquakeDto> getEarthquakes(int year, double minMagnitude, String orderBy) {
        String uriTemplate = String.format(
                "/fdsnws/event/1/query?format=geojson&starttime=%d-01-01&endtime=%d-12-31&minmagnitude=%s&orderby=%s",
                year, year, minMagnitude, orderBy); // orderby 파라미터 추가

        // WebClient를 사용하여 지진 데이터 API 호출
        return webClient.get()
                .uri(uriTemplate)
                .retrieve()
                .bodyToMono(String.class) // 응답 본문을 String으로 변환 (Mono)
                .flatMapMany(body -> Flux.fromIterable(EarthquakeDto.parseEarthquakeData(body))); // String을 EarthquakeDto 객체 목록 (Flux)으로 변환
    }

}
