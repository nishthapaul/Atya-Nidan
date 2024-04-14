package com.atyanidan.service;

import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.mysql.Form;

public interface FormService {
    Form createForm(FormDefinition formDefinition);
}
