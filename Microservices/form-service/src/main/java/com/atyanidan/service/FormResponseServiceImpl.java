package com.atyanidan.service;

import com.atyanidan.dao.FormResponseRepository;
import com.atyanidan.dao.OlapFormRepository;
import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.Form;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormResponseServiceImpl implements FormResponseService {


    private final OlapFormRepository olapFormRepository;

    @Autowired
    public FormResponseServiceImpl(OlapFormRepository olapFormRepository) {
        this.olapFormRepository = olapFormRepository;
    }

    public Form createFormResponse(OlapForm olapForm) {
        OlapForm savedOlapForm = olapFormRepository.save(olapForm);
        System.out.println(savedOlapForm.getId());
        return new Form();
    }

}
