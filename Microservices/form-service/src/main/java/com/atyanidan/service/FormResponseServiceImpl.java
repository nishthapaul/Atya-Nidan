package com.atyanidan.service;

import com.atyanidan.dao.*;
import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.*;
import com.atyanidan.exception.NotFoundException;
import com.atyanidan.utils.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FormResponseServiceImpl implements FormResponseService {

    private final FormResponseRepository formResponseRepository;
    private final OlapFormRepository olapFormRepository;
    private final FieldworkerService fieldworkerService;
    private final FormService formService;
    private final AbhaService abhaService;
    private final TalukaRepository talukaRepository;
    private final DemographicRepository demographicRepository;
    private final PatientRepository patientRepository;
    private final IdGenerator idGenerator;

    @Autowired
    public FormResponseServiceImpl(FormResponseRepository formResponseRepository, OlapFormRepository olapFormRepository, FieldworkerService fieldworkerService, FormService formService, AbhaService abhaService, TalukaRepository talukaRepository, DemographicRepository demographicRepository, PatientRepository patientRepository, IdGenerator idGenerator) {
        this.formResponseRepository = formResponseRepository;
        this.olapFormRepository = olapFormRepository;
        this.fieldworkerService = fieldworkerService;
        this.formService = formService;
        this.abhaService = abhaService;
        this.talukaRepository = talukaRepository;
        this.demographicRepository = demographicRepository;
        this.patientRepository = patientRepository;
        this.idGenerator = idGenerator;
    }

    public FormResponse createFormResponse(OlapForm olapForm) {
        FieldWorker fieldWorker = fieldworkerService.getFieldWorkerById(olapForm.getFieldWorkerId());

        Form form = formService.getFormById(olapForm.getFormId());

        Abha abha = abhaService.getAbhaByAbhaNumber(olapForm.getAbhaNumber());

        OlapForm savedOlapForm = olapFormRepository.save(olapForm);
        System.out.println(savedOlapForm.getId());

        Patient patient = patientRepository.findByAbhaNumber(olapForm.getAbhaNumber());
        if (patient == null) {
            Taluka taluka = talukaRepository.findByName(abha.getTaluka());
            System.out.println(taluka);
            Demographic demographic = new Demographic(abha.getFirstName(), abha.getMiddleName(), abha.getLastName(), abha.getAddress(), abha.getPhoneNumber(), abha.getDob(), abha.getGender(), abha.getBloodGroup(), taluka);
            Demographic savedDemographic = demographicRepository.save(demographic);
            System.out.println(savedDemographic);

            patient = new Patient(olapForm.getAbhaNumber(), savedDemographic);
            Patient savedPatient = patientRepository.save(patient);
            System.out.println(savedPatient);

            String patientNumber = idGenerator.generate("PT", savedPatient.getId(), abha.getFirstName());
            savedPatient.setPatientNumber(patientNumber);
            savedPatient = patientRepository.save(savedPatient);
            System.out.println(savedPatient);

            patient = savedPatient;
        }

        String olapFormId = savedOlapForm.getId();
        FormResponse formResponse = new FormResponse(form, fieldWorker, patient, olapFormId);
        FormResponse savedFormResponse = formResponseRepository.save(formResponse);

        return savedFormResponse;
    }

}