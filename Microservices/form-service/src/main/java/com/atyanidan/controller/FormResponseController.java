package com.atyanidan.controller;

import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.Form;
import com.atyanidan.service.FormResponseService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void addForm(@RequestBody OlapForm olapForm) {
        System.out.println(olapForm);
        Form dbForm = formResponseService.createFormResponse(olapForm);
//        return ResponseEntity.status(HttpStatus.CREATED).body(new Object());
    }
}
