package dankook.ce.lab2.controller;

import dankook.ce.lab2.dto.EarthquakeDto;
import dankook.ce.lab2.service.EarthquakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

// RestController : api 제공
@RestController
public class EarthquakeController {
    private final EarthquakeService earthquakeService;

    // EarthquakeService의 의존성 주입
    @Autowired
    public EarthquakeController(EarthquakeService earthquakeService) {
        this.earthquakeService = earthquakeService;
    }

    // 지진 정보를 조회하는 API 엔드포인트 정의
    @GetMapping("/api/earthquakes")
    public Flux<EarthquakeDto> getEarthquakes(@RequestParam(name = "year", required = false, defaultValue = "2024") int year,
                                              @RequestParam(name = "minMagnitude", required = false, defaultValue = "7.0") double minMagnitude,
                                              @RequestParam(name = "orderBy", required = false, defaultValue = "time") String orderBy) {
        // EarthquakeService를 통해 지진 정보 조회 및 반환
        return earthquakeService.getEarthquakes(year, minMagnitude, orderBy);
    }
}

