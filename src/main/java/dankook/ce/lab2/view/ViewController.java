package dankook.ce.lab2.view;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 뷰 컨트롤러 클래스
 */
@Controller
public class ViewController {

    /**
     * 메인 페이지를 표시합니다.
     *
     * @param model 모델 객체 (Spring MVC 에서 데이터를 뷰로 전달하는 용도)
     * @return "index" - 표시할 템플릿 이름
     */
    @GetMapping("")
    public String showMain(Model model) {
        return "index";
    }

    /**
     * 지진 목록 페이지를 표시합니다.
     *
     * @param model 모델 객체
     * @return "earthquake-list" - 표시할 템플릿 이름
     */
    @GetMapping("/earthquakes")
    public String showEarthquakeList(Model model) {
        return "earthquake-list";
    }

    /**
     * 화산 목록 페이지를 표시합니다.
     *
     * @param model 모델 객체
     * @return "volcano-list" - 표시할 템플릿 이름
     */
    @GetMapping("/volcanoes")
    public String showVolcanoList(Model model) {
        return "volcano-list";
    }

    /**
     * 지도 페이지를 표시합니다.
     *
     * @param model 모델 객체
     * @return "map" - 표시할 템플릿 이름
     */
    @GetMapping("/map")
    public String showMap(Model model) {
        return "map";
    }
}
