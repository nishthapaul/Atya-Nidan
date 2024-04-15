package com.atyanidan.service;

import com.atyanidan.dao.FormResponseRepository;
import com.atyanidan.dao.OlapFormRepository;
import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.FormResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormResponseServiceImpl implements FormResponseService {

    private final FormResponseRepository formResponseRepository;
    private final OlapFormRepository olapFormRepository;

    @Autowired
    public FormResponseServiceImpl(FormResponseRepository formResponseRepository, OlapFormRepository olapFormRepository) {
        this.formResponseRepository = formResponseRepository;
        this.olapFormRepository = olapFormRepository;
    }

    public FormResponse createFormResponse(OlapForm olapForm) {
        OlapForm savedOlapForm = olapFormRepository.save(olapForm);
        System.out.println(savedOlapForm.getId());

        String olapFormId = savedOlapForm.getId();
        FormResponse formResponse = new FormResponse(olapFormId);

        FormResponse savedFormResponse = formResponseRepository.save(formResponse);

        return savedFormResponse;
    }

}
