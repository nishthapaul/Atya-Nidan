package com.atyanidan.service;

import com.atyanidan.dao.FormDefinitionRepository;
import com.atyanidan.entity.elasticsearch.FormDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormDefinitionServiceImpl implements FormDefinitionService {
    private final FormDefinitionRepository formDefinitionRepository;

    @Autowired
    public FormDefinitionServiceImpl(FormDefinitionRepository formDefinitionRepository) {
        this.formDefinitionRepository = formDefinitionRepository;
    }

    public Iterable<FormDefinition> getFormDefinitions() {
        return formDefinitionRepository.findAll();
    }

    public FormDefinition getFormDefinition(String id) {
        return formDefinitionRepository.findById(id).orElse(null);
    }

    public FormDefinition insertFormDefinition(FormDefinition product) {
        return formDefinitionRepository.save(product);
    }
}
