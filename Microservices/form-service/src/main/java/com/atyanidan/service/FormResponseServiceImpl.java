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
    private final FieldWorkerRepository fieldWorkerRepository;
    private final FormRepository formRepository;
    private final AbhaRepository abhaRepository;
    private final TalukaRepository talukaRepository;
    private final DemographicRepository demographicRepository;
    private final PatientRepository patientRepository;
    private final IdGenerator idGenerator;

    @Autowired
    public FormResponseServiceImpl(FormResponseRepository formResponseRepository, OlapFormRepository olapFormRepository, FieldWorkerRepository fieldWorkerRepository, FormRepository formRepository, AbhaRepository abhaRepository, TalukaRepository talukaRepository, DemographicRepository demographicRepository, PatientRepository patientRepository, IdGenerator idGenerator) {
        this.formResponseRepository = formResponseRepository;
        this.olapFormRepository = olapFormRepository;
        this.fieldWorkerRepository = fieldWorkerRepository;
        this.formRepository = formRepository;
        this.abhaRepository = abhaRepository;
        this.talukaRepository = talukaRepository;
        this.demographicRepository = demographicRepository;
        this.patientRepository = patientRepository;
        this.idGenerator = idGenerator;
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
        if (abha == null) {
            throw new NotFoundException("Abha ID doesn't exist.");
        }
        System.out.println(abha);

        Taluka taluka = talukaRepository.findByName(abha.getTaluka());
        System.out.println(taluka);
        Demographic demographic = new Demographic(abha.getFirstName(), abha.getMiddleName(), abha.getLastName(), abha.getAddress(), abha.getPhoneNumber(), abha.getDob(), abha.getGender(), abha.getBloodGroup(), taluka);
        Demographic savedDemographic = demographicRepository.save(demographic);
        System.out.println(savedDemographic);

        Patient patient = new Patient(olapForm.getAbhaNumber(), savedDemographic);
        Patient savedPatient = patientRepository.save(patient);
        System.out.println(savedPatient);

        String patientNumber = idGenerator.generate("PT", savedPatient.getId(), abha.getFirstName());
        savedPatient.setPatientNumber(patientNumber);
        savedPatient = patientRepository.save(savedPatient);
        System.out.println(savedPatient);

        OlapForm savedOlapForm = olapFormRepository.save(olapForm);
        System.out.println(savedOlapForm.getId());
        String olapFormId = savedOlapForm.getId();

        FormResponse formResponse = new FormResponse(form, fieldWorker, savedPatient, olapFormId);
        FormResponse savedFormResponse = formResponseRepository.save(formResponse);

        return savedFormResponse;
    }

}
