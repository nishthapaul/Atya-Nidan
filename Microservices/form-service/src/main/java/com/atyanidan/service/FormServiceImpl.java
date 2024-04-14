package com.atyanidan.service;

import com.atyanidan.dao.FormDefinitionRepository;
import com.atyanidan.dao.FormRepository;
import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.mysql.Form;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class FormServiceImpl implements FormService {
    private final FormRepository formRepository;
    private final FormDefinitionRepository formDefinitionRepository;

    @Autowired
    public FormServiceImpl(FormRepository formRepository, FormDefinitionRepository formDefinitionRepository) {
        this.formRepository = formRepository;
        this.formDefinitionRepository = formDefinitionRepository;
    }

    public Form createForm(FormDefinition product) {
        FormDefinition formDefinition = formDefinitionRepository.save(product);
        System.out.println(formDefinition.getId());
        Form form = new Form(true, formDefinition.getId());
        return formRepository.save(form);
    }
}
