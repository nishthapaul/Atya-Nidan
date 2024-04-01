package com.atyanidan.controller;

import com.atyanidan.service.ApiGatewayService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/atyanidan")
public class ApiGatewayController {

    private final RestTemplate restTemplate;
    private final ApiGatewayService apiGatewayService;

    @Autowired
    public ApiGatewayController(RestTemplate restTemplate, ApiGatewayService apiGatewayService) {
        this.restTemplate = restTemplate;
        this.apiGatewayService = apiGatewayService;
    }

    @GetMapping("/health/**")
    public ResponseEntity<Object> forwardHealthGetRequest(HttpServletRequest request) throws JsonProcessingException {
        String fullUrl = request.getRequestURL().toString();
        System.out.println(fullUrl);
        String healthServiceUrl = replacePortBasedOnPath(fullUrl);
        System.out.println(healthServiceUrl);
        return apiGatewayService.forwardRequest(healthServiceUrl, HttpMethod.GET, null);
    }

    @PostMapping(path = "/health/**", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Object> forwardHealthPostRequest(HttpServletRequest request, @RequestBody Object requestBody) throws JsonProcessingException {
        String fullUrl = request.getRequestURL().toString();
        System.out.println(fullUrl);
        String healthServiceUrl = replacePortBasedOnPath(fullUrl);
        System.out.println(healthServiceUrl);
        return apiGatewayService.forwardRequest(healthServiceUrl, HttpMethod.POST, requestBody);
    }

    @PutMapping(path = "/health/**", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Object> forwardHealthPutRequest(HttpServletRequest request, @RequestBody Object requestBody) throws JsonProcessingException {
        String fullUrl = request.getRequestURL().toString();
        System.out.println(fullUrl);
        String healthServiceUrl = replacePortBasedOnPath(fullUrl);
        System.out.println(healthServiceUrl);
        return apiGatewayService.forwardRequest(healthServiceUrl, HttpMethod.PUT, requestBody);
    }

    @GetMapping("/form/**")
    public ResponseEntity<Object> forwardFormRequest(@PathVariable String path) {
        String formServiceUrl = "http://localhost:9002/atyanidan/form/" + path.substring(path.indexOf("/") + 1);
        return restTemplate.exchange(formServiceUrl, HttpMethod.GET, null, Object.class);
    }

    private String replacePortBasedOnPath(String fullUrl) {
        if ( fullUrl == null || fullUrl.isEmpty() ) {
            return fullUrl;
        }
        String baseUrl = "http://localhost:";
        int portReplacement = 9001;
        if ( fullUrl.contains("/atyanidan/health/") ) {
            portReplacement = 9003;
        } else if ( fullUrl.contains("/atyanidan/form/") ) {
            portReplacement = 9002;
        }

        return fullUrl.replaceFirst(baseUrl + "9001", baseUrl + portReplacement);
    }

}
