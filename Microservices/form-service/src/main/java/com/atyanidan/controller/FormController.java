package com.atyanidan.controller;

import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.mysql.Form;
import com.atyanidan.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/forms")
public class FormController {

    private final FormService formService;

    @Autowired
    public FormController(FormService formService) {
        this.formService = formService;
    }

    @PostMapping
    public ResponseEntity<Form> addForm(@RequestBody FormDefinition formDefinition) {
        Form dbForm = formService.createForm(formDefinition);
        return ResponseEntity.status(HttpStatus.CREATED).body(dbForm);
    }
}
