package dankook.ce.lab2.view;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("")
    public String showMain(Model model){
        return "index";
    }

    @GetMapping("/earthquakes")
    public String showEarthquakeList(Model model) {
        // "earthquake-list"는 Thymeleaf 템플릿의 이름입니다.
        return "earthquake-list";
    }
}
