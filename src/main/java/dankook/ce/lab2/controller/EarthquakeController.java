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

    @Autowired
    public EarthquakeController(EarthquakeService earthquakeService) {
        this.earthquakeService = earthquakeService;
    }

    @GetMapping("/api/earthquakes")
    public Flux<EarthquakeDto> getEarthquakes(@RequestParam(name = "year", required = false, defaultValue = "2024") int year,
                                              @RequestParam(name = "minMagnitude", required = false, defaultValue = "7.0") double minMagnitude,
                                              @RequestParam(name = "orderBy", required = false, defaultValue = "time") String orderBy) {
        return earthquakeService.getEarthquakes(year, minMagnitude, orderBy);
    }
}
