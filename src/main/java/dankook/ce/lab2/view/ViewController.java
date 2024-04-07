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
        return "earthquake-list";
    }

    @GetMapping("/volcanoes")
    public String showVolcanoList(Model model) {
        return "volcano-list";
    }

    @GetMapping("/map")
    public String showMap(Model model) {
        return "map";
    }
}
