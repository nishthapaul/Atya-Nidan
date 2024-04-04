package com.atyanidan.service;

import com.atyanidan.exception.ErrorResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
public class ApiGatewayServiceImpl implements ApiGatewayService {
    private final RestTemplate restTemplate;

    @Autowired
    public ApiGatewayServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public Object forwardRequest(String serviceUrl, HttpMethod method, Object requestBody) throws JsonProcessingException {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Object> requestEntity = null;
            if (requestBody != null) {
                requestEntity = new HttpEntity<>(requestBody, headers);
            }
            return restTemplate.exchange(serviceUrl, method, requestEntity, Object.class).getBody();
        } catch (HttpStatusCodeException e) {
            String errorResponse = e.getResponseBodyAsString();
            ErrorResponse errorObject = new ObjectMapper().readValue(errorResponse, ErrorResponse.class);
            return ResponseEntity.status(errorObject.getStatus())
                    .body(errorObject);
        }
    }
}
