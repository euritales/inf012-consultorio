package com.example.Consultorio.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class Config implements WebMvcConfigurer {
    public Config() {
    }

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods(new String[]{"*"}).allowedHeaders(new String[]{"*"}).allowedOrigins(new String[]{"http://localhost:3000"}).allowCredentials(false).maxAge(-1L);
    }
}