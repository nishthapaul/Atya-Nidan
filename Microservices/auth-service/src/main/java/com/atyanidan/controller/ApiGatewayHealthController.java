package com.atyanidan.controller;

import com.atyanidan.service.ApiGatewayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/atyanidan/health")
public class ApiGatewayHealthController extends BaseApiGatewayController {

    @Autowired
    public ApiGatewayHealthController(ApiGatewayService apiGatewayService) {
        super(apiGatewayService);
        System.out.println("ApiGatewayHealthController constructor");
        servicePort = 9003;
    }

    @Override
    protected String constructServiceUrl(String requestUrl) {
        System.out.println("ApiGatewayHealthController constructServiceUrl");
        return super.constructServiceUrl(requestUrl);
    }
}
