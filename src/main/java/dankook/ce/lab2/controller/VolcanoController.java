package dankook.ce.lab2.controller;

import dankook.ce.lab2.dto.VolcanoDto;
import dankook.ce.lab2.service.VolcanoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
public class VolcanoController {
    private final VolcanoService volcanoService;

    // VolcanoService 의존성 주입
    @Autowired
    public VolcanoController(VolcanoService volcanoService) {
        this.volcanoService = volcanoService;
    }

    // '/api/volcanoes' 엔드포인트를 통해 화산 정보 조회 API 제공
    @GetMapping("/api/volcanoes")
    public Flux<VolcanoDto> getVolcanoes() {
        return volcanoService.getVolcanoes();
    }
}
