package com.atyanidan.service;

import com.atyanidan.dao.OlapPrescriptionRepository;
import com.atyanidan.dao.PrescriptionResponseRepository;
import com.atyanidan.entity.*;
import com.atyanidan.entity.actor.Doctor;
import com.atyanidan.entity.actor.FieldWorker;
import com.atyanidan.entity.elasticsearch.OlapPrescription;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrescriptionResponseServiceImpl implements PrescriptionResponseService {

    private final PrescriptionResponseRepository prescriptionResponseRepository;
    private final OlapPrescriptionRepository olapPrescriptionRepository;
    private final PatientService patientService;
    private final UserService userService;
    private final FormService formService;
    private final FormResponseService formResponseService;
    private  final ICD10CodeService icd10CodeService;


    @Autowired
    public PrescriptionResponseServiceImpl(PrescriptionResponseRepository prescriptionResponseRepository, OlapPrescriptionRepository olapPrescriptionRepository, PatientService patientService, UserService userService, FormService formService, FormResponseService formResponseService, ICD10CodeService icd10CodeService) {
        this.prescriptionResponseRepository = prescriptionResponseRepository;
        this.olapPrescriptionRepository = olapPrescriptionRepository;
        this.patientService = patientService;
        this.userService = userService;
        this.formService = formService;
        this.formResponseService = formResponseService;
        this.icd10CodeService = icd10CodeService;
    }

    @Override
    public PrescriptionResponse createPrescriptionResponse(OlapPrescription olapPrescription) {
        System.out.println(olapPrescription);

        Patient patient = patientService.findByPatientNumber(olapPrescription.getPatientNumber());
        Doctor doctor = (Doctor) userService.getUserFromEmployeeId(olapPrescription.getDoctorId());
        Form form = formService.findByTitle(olapPrescription.getFormTitle());

        FormResponse correspondingFormResponse = formResponseService.findLatestByFormIdAndPatientId(form.getFormId(), patient.getId(), olapPrescription.getFormTitle());
        FieldWorker fieldWorker = correspondingFormResponse.getFieldWorker();

        System.out.println("after fieldworker");

        ICDCode icdCode = icd10CodeService.findByCode(olapPrescription.getIcdCode());
        System.out.println(icdCode);

        // TODO: Save Follow Up Details

        System.out.println("olap prescription");

        OlapPrescription savedOlapPrescription = olapPrescriptionRepository.save(olapPrescription);
        System.out.println(savedOlapPrescription.getId());

        PrescriptionResponse prescriptionResponse = new PrescriptionResponse(form, fieldWorker, patient, doctor, savedOlapPrescription.getId(), icdCode);
        PrescriptionResponse savedPrescriptionResponse = prescriptionResponseRepository.save(prescriptionResponse);

        return savedPrescriptionResponse;

    }
}
