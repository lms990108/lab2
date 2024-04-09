package dankook.ce.lab2.service;

import dankook.ce.lab2.dto.VolcanoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Service
public class VolcanoService {

    private final WebClient webClient;

    @Autowired
    public VolcanoService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://volcview.wr.usgs.gov/vv-api/volcanoApi").build();
    }

    /**
     * 화산 데이터를 조회합니다.
     *
     * @return 조회된 화산 데이터 목록 (Flux<VolcanoDto>)
     */
    public Flux<VolcanoDto> getVolcanoes() {
        String uriTemplate = "/wwvolcanoes"; // 엔드포인트 변경

        // WebClient를 사용하여 화산 데이터 API 호출
        return webClient.get()
                .uri(uriTemplate)
                .retrieve()
                .bodyToMono(String.class) // 응답 본문을 String으로 변환 (Mono)
                .flatMapMany(body -> Flux.fromIterable(VolcanoDto.parseVolcanoData(body))); // String을 VolcanoDto 객체 목록 (Flux)으로 변환
    }
}
