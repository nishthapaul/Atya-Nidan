package com.atyanidan.service;

import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.mysql.Form;
import com.atyanidan.response.FormsWithFormDefinitionsResponse;

import java.util.List;

public interface FormService {
    Form createForm(FormDefinition formDefinition);

    Form setDefaultForm(int formId);

    List<Form> getForms();

    public Form getFormById(int formId);

    FormDefinition getSelectedForm();

    List<FormsWithFormDefinitionsResponse> getFormsWithFormDefinitions();
}
