package com.atyanidan.controller;

import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.service.FormDefinitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/form-definitions")
public class FormDefinitionController {
    private final FormDefinitionService formDefinitionService;

    @Autowired
    public FormDefinitionController(FormDefinitionService formDefinitionService) {
        this.formDefinitionService = formDefinitionService;
    }

    @GetMapping
    public Iterable<FormDefinition> getFormDefinitions() {
        return formDefinitionService.getFormDefinitions();
    }

    @GetMapping("/{formDefinitionId}")
    public FormDefinition getFormDefinition(@PathVariable String formDefinitionId) {
        return formDefinitionService.getFormDefinition(formDefinitionId);
    }

    @PostMapping
    public FormDefinition addFormDefinition(@RequestBody FormDefinition formDefinition) {
        return formDefinitionService.insertFormDefinition(formDefinition);
    }
}
