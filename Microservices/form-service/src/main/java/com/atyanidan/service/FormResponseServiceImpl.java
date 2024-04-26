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
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;


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
    private final PrescriptionResponseService prescriptionResponseService;
    private final FollowUpService followUpService;

    @Autowired
    public FormResponseServiceImpl(FormResponseRepository formResponseRepository, OlapFormRepository olapFormRepository, FieldworkerService fieldworkerService, FormService formService, AbhaService abhaService, TalukaRepository talukaRepository, DemographicRepository demographicRepository, PatientRepository patientRepository, IdGenerator idGenerator, PrescriptionResponseService prescriptionResponseService, FollowUpService followUpService) {
        this.formResponseRepository = formResponseRepository;
        this.olapFormRepository = olapFormRepository;
        this.fieldworkerService = fieldworkerService;
        this.formService = formService;
        this.abhaService = abhaService;
        this.talukaRepository = talukaRepository;
        this.demographicRepository = demographicRepository;
        this.patientRepository = patientRepository;
        this.idGenerator = idGenerator;
        this.prescriptionResponseService = prescriptionResponseService;
        this.followUpService = followUpService;
    }

    public OlapForm createFormResponse(OlapFormRequest olapFormRequest) {
        System.out.println(olapFormRequest);
        FieldWorker fieldWorker = fieldworkerService.getFieldWorkerById(olapFormRequest.getFieldWorkerId());

        Form form = formService.getFormById(olapFormRequest.getFormId());

        OlapForm olapForm = new OlapForm(olapFormRequest.getFormId(), olapFormRequest.getFieldWorkerId(), olapFormRequest.getFormType(), olapFormRequest.getFields());

        OlapForm savedOlapForm = olapFormRepository.save(olapForm);
        System.out.println(savedOlapForm.getId());

        Boolean isUnhealthy = (Boolean) olapForm.getFields().get("unhealthy");

        FormType formType = olapForm.getFormType();

        Patient patient = null;

        if ( isUnhealthy ) {
            if (formType == FormType.Regular) {
                patient = patientRepository.findByAbhaNumber(olapFormRequest.getPatientIdNumber());
                if ( patient == null ) {
                    Abha abha = abhaService.getAbhaByAbhaNumber(olapFormRequest.getPatientIdNumber());
                    Taluka taluka = talukaRepository.findByName(abha.getTaluka());
                    System.out.println(taluka);
                    Demographic demographic = new Demographic(abha.getFirstName(), abha.getMiddleName(), abha.getLastName(), abha.getAddress(), abha.getPhoneNumber(), abha.getDob(), abha.getGender(), abha.getBloodGroup(), taluka);
                    Demographic savedDemographic = demographicRepository.save(demographic);
                    System.out.println(savedDemographic);

                    patient = new Patient(olapFormRequest.getPatientIdNumber(), savedDemographic);
                    Patient savedPatient = patientRepository.save(patient);
                    System.out.println(savedPatient);

                    String patientNumber = idGenerator.generate("PT", savedPatient.getId(), abha.getFirstName());
                    savedPatient.setPatientNumber(patientNumber);
                    savedPatient = patientRepository.save(savedPatient);
                    System.out.println(savedPatient);

                    patient = savedPatient;
                }
            } else {
                // FormType: Follow Up
                patient = patientRepository.findByPatientNumber(olapFormRequest.getPatientIdNumber());
            }

            String olapFormId = savedOlapForm.getId();
            FormResponse formResponse = new FormResponse(form, fieldWorker, patient, olapFormId, olapForm.getFormType());
            formResponseRepository.save(formResponse);
        } else {
            System.out.println("healthy");
            // If FormType is FollowUp then PatientIdNumber is PatientNumber PTxxxx otherwise it is Abha Number
            // Assumption: A follow-up form will be filled for a patient whose regular form and prescription have already been filled
            if ( formType == FormType.FollowUp ) {
                // prescription response - search for first / top filled prescription
                patient = patientRepository.findByPatientNumber(olapFormRequest.getPatientIdNumber());

                PrescriptionResponse latestPrescription = prescriptionResponseService.findLatestByFormIdAndPatientId(form.getFormId(), patient.getId(), form.getTitle());
                FollowUp followUp = latestPrescription.getFollowUp();
                followUp.setNoOfFollowUpsCompleted(followUp.getNoOfFollowUpsCompleted() + 1);

                Date date = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String formattedDate = formatter.format(date);
                Timestamp timestamp = Timestamp.valueOf(formattedDate);
                followUp.setMostRecentFollowUpDate(timestamp);
                FollowUp savedFollowUp = followUpService.saveFollowUp(followUp);
                if ( savedFollowUp.getNoOfFollowUpsCompleted() == latestPrescription.getFollowUp().getRepeatFrequency() ) {
                    latestPrescription.setFollowUpComplete(true);
                    prescriptionResponseService.save(latestPrescription);
                }

                String olapFormId = savedOlapForm.getId();
                FormResponse formResponse = new FormResponse(form, fieldWorker, patient, olapFormId, olapForm.getFormType());
                formResponseRepository.save(formResponse);
            }
            // If form type is Regular then do nothing - it will only save to elasticsearch
        }
        return savedOlapForm;
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
