package com.atyanidan.controller;

import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.mysql.Form;
import com.atyanidan.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PutMapping("/default/{formId}")
    public ResponseEntity<Form> setDefaultForm(@PathVariable int formId) {
        return ResponseEntity.ok(formService.setDefaultForm(formId));
    }

    @GetMapping
    public List<Form> getForms() {
        return formService.getForms();
    }

    @GetMapping("/default")
    public FormDefinition getDefaultForm() {
        return formService.getSelectedForm();
    }
}
