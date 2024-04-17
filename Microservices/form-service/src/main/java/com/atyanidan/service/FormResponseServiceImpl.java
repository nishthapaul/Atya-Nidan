package com.atyanidan.service;

import com.atyanidan.dao.*;
import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.*;
import com.atyanidan.exception.NotFoundException;
import com.atyanidan.request.OlapFormRequest;
import com.atyanidan.response.FormNameTimestampResponse;
import com.atyanidan.utils.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public FormResponse createFormResponse(OlapFormRequest olapFormRequest) {
        System.out.println(olapFormRequest);
        FieldWorker fieldWorker = fieldworkerService.getFieldWorkerById(olapFormRequest.getFieldWorkerId());

        Form form = formService.getFormById(olapFormRequest.getFormId());

        Abha abha = abhaService.getAbhaByAbhaNumber(olapFormRequest.getAbhaNumber());

        OlapForm olapForm = new OlapForm(olapFormRequest.getFormId(), olapFormRequest.getFieldWorkerId(), olapFormRequest.getFormType(), olapFormRequest.getFields());

        OlapForm savedOlapForm = olapFormRepository.save(olapForm);
        System.out.println(savedOlapForm.getId());

        Patient patient = patientRepository.findByAbhaNumber(olapFormRequest.getAbhaNumber());
        if (patient == null) {
            Taluka taluka = talukaRepository.findByName(abha.getTaluka());
            System.out.println(taluka);
            Demographic demographic = new Demographic(abha.getFirstName(), abha.getMiddleName(), abha.getLastName(), abha.getAddress(), abha.getPhoneNumber(), abha.getDob(), abha.getGender(), abha.getBloodGroup(), taluka);
            Demographic savedDemographic = demographicRepository.save(demographic);
            System.out.println(savedDemographic);

            patient = new Patient(olapFormRequest.getAbhaNumber(), savedDemographic);
            Patient savedPatient = patientRepository.save(patient);
            System.out.println(savedPatient);

            String patientNumber = idGenerator.generate("PT", savedPatient.getId(), abha.getFirstName());
            savedPatient.setPatientNumber(patientNumber);
            savedPatient = patientRepository.save(savedPatient);
            System.out.println(savedPatient);

            patient = savedPatient;
        }

        String olapFormId = savedOlapForm.getId();
        FormResponse formResponse = new FormResponse(form, fieldWorker, patient, olapFormId, olapForm.getFormType());
        FormResponse savedFormResponse = formResponseRepository.save(formResponse);

        return savedFormResponse;
    }

    @Override
    public List<FormNameTimestampResponse> getFormsNameAndTimestampByPatientNumber(String patientNumber) {
        Patient patient = patientRepository.findByPatientNumber(patientNumber);
        if (patient == null) {
            throw new NotFoundException("Patient doesn't exist");
        }
        List<FormResponse> formResponsesByPatient = formResponseRepository.findByPatient(patient);
        List<FormNameTimestampResponse> responseList = new ArrayList<>();

        for (FormResponse formResponse : formResponsesByPatient) {
            responseList.add(new FormNameTimestampResponse(formResponse.getFormResponseId(), formResponse.getForm().getTitle(), formResponse.getSubmittedOn()));
        }
        System.out.println(responseList);
        return responseList;
    }

}
