package com.atyanidan.controller;

import com.atyanidan.service.ApiGatewayService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class BaseApiGatewayController {
    private final ApiGatewayService apiGatewayService;
    protected int servicePort;

    @Autowired
    public BaseApiGatewayController(ApiGatewayService apiGatewayService) {
        System.out.println("BaseApiGatewayController constructor");
        this.apiGatewayService = apiGatewayService;
        servicePort = 9001;
    }

    @GetMapping("/**")
    public ResponseEntity<Object> forwardHealthGetRequest(HttpServletRequest request) throws JsonProcessingException {
        System.out.println("BaseApiGatewayController forwardHealthGetRequest");
        String fullUrl = request.getRequestURL().toString();
        System.out.println(fullUrl);
        String healthServiceUrl = constructServiceUrl(fullUrl);
        System.out.println(healthServiceUrl);
        return apiGatewayService.forwardRequest(healthServiceUrl, HttpMethod.GET, null);
    }

    @PostMapping(path = "/**", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Object> forwardHealthPostRequest(HttpServletRequest request, @RequestBody Object requestBody) throws JsonProcessingException {
        System.out.println("BaseApiGatewayController forwardHealthPostRequest");
        String fullUrl = request.getRequestURL().toString();
        System.out.println(fullUrl);
        String healthServiceUrl = constructServiceUrl(fullUrl);
        System.out.println(healthServiceUrl);
        return apiGatewayService.forwardRequest(healthServiceUrl, HttpMethod.POST, requestBody);
    }

    @PutMapping(path = "/**", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Object> forwardHealthPutRequest(HttpServletRequest request, @RequestBody Object requestBody) throws JsonProcessingException {
        System.out.println("BaseApiGatewayController forwardHealthPutRequest");
        String fullUrl = request.getRequestURL().toString();
        System.out.println(fullUrl);
        String healthServiceUrl = constructServiceUrl(fullUrl);
        System.out.println(healthServiceUrl);
        return apiGatewayService.forwardRequest(healthServiceUrl, HttpMethod.PUT, requestBody);
    }

    protected String constructServiceUrl(String requestUrl) {
        System.out.println("BaseApiGatewayController constructServiceUrl");
        String baseUrl = "http://localhost:";
        return requestUrl.replaceFirst(baseUrl + "9001", baseUrl + servicePort);
    }
}
