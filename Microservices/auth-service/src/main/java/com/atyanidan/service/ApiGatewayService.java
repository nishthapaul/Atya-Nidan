package com.atyanidan.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.HttpMethod;

public interface ApiGatewayService {
    Object forwardRequest(String serviceUrl, HttpMethod method, Object requestBody) throws JsonProcessingException;
}
