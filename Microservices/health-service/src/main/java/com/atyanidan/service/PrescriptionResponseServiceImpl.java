package com.atyanidan.service;

import com.atyanidan.dao.OlapPrescriptionRepository;
import com.atyanidan.dao.PrescriptionResponseRepository;
import com.atyanidan.entity.Form;
import com.atyanidan.entity.FormResponse;
import com.atyanidan.entity.Patient;
import com.atyanidan.entity.PrescriptionResponse;
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

    @Autowired
    public PrescriptionResponseServiceImpl(PrescriptionResponseRepository prescriptionResponseRepository, OlapPrescriptionRepository olapPrescriptionRepository, PatientService patientService, UserService userService, FormService formService, FormResponseService formResponseService) {
        this.prescriptionResponseRepository = prescriptionResponseRepository;
        this.olapPrescriptionRepository = olapPrescriptionRepository;
        this.patientService = patientService;
        this.userService = userService;
        this.formService = formService;
        this.formResponseService = formResponseService;
    }

    @Override
    public PrescriptionResponse createPrescriptionResponse(OlapPrescription olapPrescription) {
        System.out.println(olapPrescription);

        Patient patient = patientService.findByPatientNumber(olapPrescription.getPatientNumber());
        Doctor doctor = (Doctor) userService.getUserFromEmployeeId(olapPrescription.getDoctorId());
        Form form = formService.findByTitle(olapPrescription.getFormTitle());

        FormResponse correspondingFormResponse = formResponseService.findLatestByFormIdAndPatientId(form.getFormId(), patient.getId(), olapPrescription.getFormTitle());
        FieldWorker fieldWorker = correspondingFormResponse.getFieldWorker();

        // TODO: Save Follow Up Details

        OlapPrescription savedOlapPrescription = olapPrescriptionRepository.save(olapPrescription);
        System.out.println(savedOlapPrescription.getId());

        PrescriptionResponse prescriptionResponse = new PrescriptionResponse(form, fieldWorker, patient, doctor, savedOlapPrescription.getId());
        PrescriptionResponse savedPrescriptionResponse = prescriptionResponseRepository.save(prescriptionResponse);

        return savedPrescriptionResponse;

    }
}
