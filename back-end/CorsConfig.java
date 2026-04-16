package com.wqm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// config for CORS (needed for frontend to call backend)
@Configuration
public class CorsConfig {

```
@Bean
public WebMvcConfigurer corsConfigurer() {

    // using anonymous class for now (simplest way)
    return new WebMvcConfigurer() {

        @Override
        public void addCorsMappings(CorsRegistry registry) {

            // allowing API endpoints
            registry.addMapping("/api/**")

                    // frontend URLs (might change later)
                    .allowedOrigins(
                            "http://localhost:8080",
                            "http://localhost:3000"
                    )

                    // basic methods
                    .allowedMethods("GET", "POST", "PUT", "DELETE")

                    // allowing all headers for now (not restricting yet)
                    .allowedHeaders("*");

            // TODO: maybe restrict origins in production
        }
    };
}
```

}
