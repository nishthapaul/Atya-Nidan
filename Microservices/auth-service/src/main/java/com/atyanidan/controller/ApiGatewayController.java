package com.atyanidan.controller;

import com.atyanidan.exception.ErrorResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/atyanidan")
public class ApiGatewayController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/health/**")
    public ResponseEntity<Object> forwardGetHealthRequest(HttpServletRequest request) {
        String fullUrl = request.getRequestURL().toString();
        System.out.println(fullUrl);
        String healthServiceUrl = replacePortBasedOnPath(fullUrl);
        System.out.println(healthServiceUrl);
        ResponseEntity<Object> exchange = restTemplate.exchange(healthServiceUrl, HttpMethod.GET, null, Object.class);
        System.out.println(exchange);
        return exchange;
    }

    @PostMapping(path = "/health/**", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Object> forwardPostHealthRequest(HttpServletRequest request, @RequestBody Object requestBody) throws JsonProcessingException {
        String fullUrl = request.getRequestURL().toString();
        System.out.println(fullUrl);
        String healthServiceUrl = replacePortBasedOnPath(fullUrl);
        System.out.println(healthServiceUrl);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            return restTemplate.exchange(healthServiceUrl, HttpMethod.POST, requestEntity, Object.class);
        } catch (HttpStatusCodeException e) {
            String errorResponse = e.getResponseBodyAsString();
            ErrorResponse errorObject = new ObjectMapper().readValue(errorResponse, ErrorResponse.class);
            return ResponseEntity.status(errorObject.getStatus())
                    .body(errorObject);
        }
    }

    @GetMapping("/form/**")
    public ResponseEntity<Object> forwardFormRequest(@PathVariable String path) {
        String formServiceUrl = "http://localhost:9002/atyanidan/form/" + path.substring(path.indexOf("/") + 1);
        return restTemplate.exchange(formServiceUrl, HttpMethod.GET, null, Object.class);
    }

    private String replacePortBasedOnPath(String fullUrl) {
        if (fullUrl == null || fullUrl.isEmpty()) {
            return fullUrl;
        }

        String baseUrl = "http://localhost:";
        int portReplacement = 9001;

        if (fullUrl.contains("/atyanidan/health/")) {
            portReplacement = 9003;
        } else if (fullUrl.contains("/atyanidan/form/")) {
            portReplacement = 9002;
        }

        String replacedUrl = fullUrl.replaceFirst(baseUrl + "9001", baseUrl + portReplacement);
        return replacedUrl;
    }

}
