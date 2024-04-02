package com.atyanidan.controller;

import com.atyanidan.service.ApiGatewayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/atyanidan/form")
public class ApiGatewayFormController extends BaseApiGatewayController {

    @Autowired
    public ApiGatewayFormController(ApiGatewayService apiGatewayService) {
        super(apiGatewayService);
        System.out.println("ApiGatewayFormController constructor");
        servicePort = 9002;
    }

    @Override
    protected String constructServiceUrl(String requestUrl) {
        return super.constructServiceUrl(requestUrl);
    }
}
