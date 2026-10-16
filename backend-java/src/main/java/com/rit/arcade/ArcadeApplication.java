package com.rit.arcade;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ArcadeApplication {

    public static void main(String[] args) {
        SpringApplication.run(ArcadeApplication.class, args);
        System.out.println("Arcade Smart Xerox Backend (Java 21 + Spring Boot 3) running on port 8080");
    }
}
