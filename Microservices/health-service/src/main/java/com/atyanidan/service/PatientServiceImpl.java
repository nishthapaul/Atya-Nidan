package com.atyanidan.service;

import com.atyanidan.dao.OlapFormRepository;
import com.atyanidan.dao.PatientRepository;
import com.atyanidan.dao.PrescriptionResponseRepository;
import com.atyanidan.entity.*;
import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final FormResponseService formResponseService;
    private final PrescriptionResponseRepository prescriptionResponseRepository;
    private final OlapFormRepository olapFormRepository;

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository, FormResponseService formResponseService, PrescriptionResponseRepository prescriptionResponseRepository, OlapFormRepository olapFormRepository) {
        this.patientRepository = patientRepository;
        this.formResponseService = formResponseService;
        this.prescriptionResponseRepository = prescriptionResponseRepository;
        this.olapFormRepository = olapFormRepository;
    }

    @Override
    public Patient findByPatientNumber(String patientNumber) {
        Optional<Patient> optional = patientRepository.findByPatientNumber(patientNumber);
        if ( optional.isEmpty() ) {
            throw new NotFoundException("Patient doesn't exist");
        }
        return optional.get();
    }

    @Override
    public List<HealthRecord> getFormsAndPrescriptionsByPatientNumber(String patientNumber) {
        Patient patient = findByPatientNumber(patientNumber);
        List<FormResponse> formResponses = formResponseService.findByPatient(patient);
        List<PrescriptionResponse> prescriptionResponses = prescriptionResponseRepository.findByPatient(patient);
        List<HealthRecord> records = new ArrayList<>();

        for (FormResponse formResponse : formResponses) {
            String olapFormId = formResponse.getOlapFormId();
            OlapForm olapForm = olapFormRepository.findById(olapFormId).get();
            String suffix = "";
            if ( olapForm.getFormType() == FormType.FollowUp ) {
                suffix = " Follow Up";
            }
            records.add(new HealthRecord(formResponse.getFormResponseId(), formResponse.getForm().getTitle() + suffix, formResponse.getSubmittedOn(), "Form"));
        }

        for (PrescriptionResponse prescriptionResponse : prescriptionResponses) {
            records.add(new HealthRecord(prescriptionResponse.getPrescriptionResponseId(), prescriptionResponse.getForm().getTitle(), prescriptionResponse.getSubmittedOn(), "Prescription"));
        }

        records = records.stream()
                .sorted(Comparator.comparing(HealthRecord::getSubmittedOn).reversed())
                .collect(Collectors.toList());

        System.out.println(records);

        return records;
    }

}
