package dankook.ce.lab2.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

@Configuration
public class AppConfig {
    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder()
                // ExchangeStrategies를 사용하여 요청/응답 시 메모리 사용량 조정
                .exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024)) // 10MB로 설정
                        .build())
                // ReactorClientHttpConnector를 통해 HTTP 클라이언트 구성
                .clientConnector(new ReactorClientHttpConnector(HttpClient.newConnection().compress(true))); // 압축 사용 설정
    }
}
