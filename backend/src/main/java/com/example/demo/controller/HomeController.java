package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Inventory Management API");
        response.put("version", "1.0.0");
        response.put("endpoints", new HashMap<String, String>() {{
            put("GET", "/api/products - Get all products");
            put("POST", "/api/products - Add new product");
            put("PUT", "/api/products/{id} - Update product");
            put("DELETE", "/api/products/{id} - Delete product");
        }});
        return response;
    }
}
