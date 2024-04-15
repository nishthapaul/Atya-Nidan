package com.atyanidan.service;

import com.atyanidan.dao.*;
import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.*;
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
    private final AbhaRepository abhaRepository;
    private final TalukaRepository talukaRepository;
    private final DemographicRepository demographicRepository;

    @Autowired
    public FormResponseServiceImpl(FormResponseRepository formResponseRepository, OlapFormRepository olapFormRepository, FieldWorkerRepository fieldWorkerRepository, FormRepository formRepository, AbhaRepository abhaRepository, TalukaRepository talukaRepository, DemographicRepository demographicRepository) {
        this.formResponseRepository = formResponseRepository;
        this.olapFormRepository = olapFormRepository;
        this.fieldWorkerRepository = fieldWorkerRepository;
        this.formRepository = formRepository;
        this.abhaRepository = abhaRepository;
        this.talukaRepository = talukaRepository;
        this.demographicRepository = demographicRepository;
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

        Abha abha = abhaRepository.findByAbhaNumber(olapForm.getAbhaNumber());
        System.out.println(abha);

//        Taluka taluka = talukaRepository.findByName(abha.getTaluka());
//        Demographic demographic = new Demographic(abha.getFirstName(), abha.getMiddleName(), abha.getLastName(), abha.getAddress(), abha.getDob(), abha.getGender(), abha.getBloodGroup(), taluka);
//        Demographic savedDemographic = demographicRepository.save(demographic);

        OlapForm savedOlapForm = olapFormRepository.save(olapForm);
        System.out.println(savedOlapForm.getId());
        String olapFormId = savedOlapForm.getId();

        FormResponse formResponse = new FormResponse(form, fieldWorker, olapFormId);
        FormResponse savedFormResponse = formResponseRepository.save(formResponse);

        return savedFormResponse;
    }

}
