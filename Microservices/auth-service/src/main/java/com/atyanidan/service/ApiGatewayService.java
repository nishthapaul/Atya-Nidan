package com.atyanidan.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

public interface ApiGatewayService {
    ResponseEntity<Object> forwardRequest(String serviceUrl, HttpMethod method, Object requestBody) throws JsonProcessingException;
}
