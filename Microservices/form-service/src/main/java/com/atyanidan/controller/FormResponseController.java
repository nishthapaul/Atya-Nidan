package com.atyanidan.controller;

import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.FormResponse;
import com.atyanidan.service.FormResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/form-responses")
public class FormResponseController {

    private final FormResponseService formResponseService;

    @Autowired
    public FormResponseController(FormResponseService formResponseService) {
        this.formResponseService = formResponseService;
    }

    @PostMapping
    public ResponseEntity<FormResponse> addForm(@RequestBody OlapForm olapForm) {
        System.out.println(olapForm);
        FormResponse savedFormResponse = formResponseService.createFormResponse(olapForm);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFormResponse);
    }
}
