package com.atyanidan.service;

import com.atyanidan.dao.OlapPrescriptionRepository;
import com.atyanidan.dao.PdfStorageRepository;
import com.atyanidan.dao.PrescriptionResponseRepository;
import com.atyanidan.entity.*;
import com.atyanidan.entity.actor.Doctor;
import com.atyanidan.entity.actor.FieldWorker;
import com.atyanidan.entity.elasticsearch.OlapPrescription;
import com.atyanidan.utils.PdfGenerator;
import com.itextpdf.text.DocumentException;
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
    private final PdfGenerator pdfGenerator;
    private final PdfStorageRepository pdfStorageRepository;
    @Autowired
    public PrescriptionResponseServiceImpl(PrescriptionResponseRepository prescriptionResponseRepository, OlapPrescriptionRepository olapPrescriptionRepository, PatientService patientService, UserService userService, FormService formService, FormResponseService formResponseService, ICD10CodeService icd10CodeService, PdfGenerator pdfGenerator, PdfStorageRepository pdfStorageRepository) {
        this.prescriptionResponseRepository = prescriptionResponseRepository;
        this.olapPrescriptionRepository = olapPrescriptionRepository;
        this.patientService = patientService;
        this.userService = userService;
        this.formService = formService;
        this.formResponseService = formResponseService;
        this.icd10CodeService = icd10CodeService;
        this.pdfGenerator = pdfGenerator;
        this.pdfStorageRepository = pdfStorageRepository;
    }

    @Override
    public PrescriptionResponse createPrescriptionResponse(OlapPrescription olapPrescription) throws DocumentException {
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

        byte[] pdfContent = pdfGenerator.generatePrescriptionPdf(doctor, patient, olapPrescription);
        PdfStorage pdfStorage = new PdfStorage();
        pdfStorage.setContent(pdfContent);
        PdfStorage savedPDF = pdfStorageRepository.save(pdfStorage);

        OlapPrescription savedOlapPrescription = olapPrescriptionRepository.save(olapPrescription);
        System.out.println(savedOlapPrescription.getId());

        PrescriptionResponse prescriptionResponse = new PrescriptionResponse(form, fieldWorker, patient, doctor, savedOlapPrescription.getId(), icdCode, savedPDF);
        PrescriptionResponse savedPrescriptionResponse = prescriptionResponseRepository.save(prescriptionResponse);

        return savedPrescriptionResponse;

    }
}
