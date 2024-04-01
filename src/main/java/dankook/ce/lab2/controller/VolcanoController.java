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

    @Autowired
    public VolcanoController(VolcanoService volcanoService) {
        this.volcanoService = volcanoService;
    }

    // 메소드를 수정하여 VolcanoService를 올바르게 사용하고 Flux<VolcanoDto>를 반환합니다.
    @GetMapping("/api/volcanoes")
    public Flux<VolcanoDto> getVolcanoes() {
        return volcanoService.getVolcanoes();
    }
}
