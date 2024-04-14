package com.atyanidan.service;

import com.atyanidan.entity.elasticsearch.FormDefinition;

public interface FormDefinitionService {
    Iterable<FormDefinition> getFormDefinitions();

    FormDefinition getFormDefinition(String id);

    FormDefinition insertFormDefinition(FormDefinition formDefinition);
}
