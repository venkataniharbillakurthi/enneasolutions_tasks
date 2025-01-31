package com.college;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class CollegeApplication {
    public static void main(String[] args) {
        SpringApplication.run(CollegeApplication.class, args);
    }
    @Configuration
    public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") 
                .allowedOrigins("http://localhost:3000")
                 
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") 
                .allowCredentials(true)
                .exposedHeaders("x-total-pages"); 
    }
    }
}


