package com.atyanidan.service;

import com.atyanidan.dao.FieldWorkerRepository;
import com.atyanidan.dao.FormRepository;
import com.atyanidan.dao.FormResponseRepository;
import com.atyanidan.dao.OlapFormRepository;
import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.FieldWorker;
import com.atyanidan.entity.mysql.Form;
import com.atyanidan.entity.mysql.FormResponse;
import com.atyanidan.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FormResponseServiceImpl implements FormResponseService {

    private final FormResponseRepository formResponseRepository;
    private final OlapFormRepository olapFormRepository;
    private final FieldWorkerRepository fieldWorkerRepository;
    private final FormRepository formRepository;

    @Autowired
    public FormResponseServiceImpl(FormResponseRepository formResponseRepository, OlapFormRepository olapFormRepository, FieldWorkerRepository fieldWorkerRepository, FormRepository formRepository) {
        this.formResponseRepository = formResponseRepository;
        this.olapFormRepository = olapFormRepository;
        this.fieldWorkerRepository = fieldWorkerRepository;
        this.formRepository = formRepository;
    }

    public FormResponse createFormResponse(OlapForm olapForm) {
        Optional<FieldWorker> optionalFieldWorker = fieldWorkerRepository.findById(olapForm.getFieldWorkerId());
        if (optionalFieldWorker.isEmpty()) {
            throw new NotFoundException("Fieldworker doesn't exist.");
        }
        FieldWorker fieldWorker = optionalFieldWorker.get();

        Optional<Form> optionalForm = formRepository.findById(olapForm.getFormId());
        if (optionalForm.isEmpty()) {
            throw new NotFoundException("Form doesn't exist.");
        }
        Form form = optionalForm.get();

        OlapForm savedOlapForm = olapFormRepository.save(olapForm);
        System.out.println(savedOlapForm.getId());
        String olapFormId = savedOlapForm.getId();

        FormResponse formResponse = new FormResponse(form, fieldWorker, olapFormId);
        FormResponse savedFormResponse = formResponseRepository.save(formResponse);

        return savedFormResponse;
    }

}
