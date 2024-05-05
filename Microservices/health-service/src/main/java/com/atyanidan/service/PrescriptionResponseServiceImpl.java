package com.atyanidan.service;

import com.atyanidan.dao.FormDefinitionRepository;
import com.atyanidan.dao.OlapPrescriptionRepository;
import com.atyanidan.dao.PdfStorageRepository;
import com.atyanidan.dao.PrescriptionResponseRepository;
import com.atyanidan.entity.*;
import com.atyanidan.entity.actor.Doctor;
import com.atyanidan.entity.actor.FieldWorker;
import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.elasticsearch.OlapPrescription;
import com.atyanidan.utils.PdfGenerator;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

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
    private final FieldWorkerService fieldWorkerService;
    private final FollowUpService followUpService;
    @Autowired
    public PrescriptionResponseServiceImpl(PrescriptionResponseRepository prescriptionResponseRepository, OlapPrescriptionRepository olapPrescriptionRepository, PatientService patientService, UserService userService, FormService formService, FormResponseService formResponseService, ICD10CodeService icd10CodeService, PdfGenerator pdfGenerator, PdfStorageRepository pdfStorageRepository, FieldWorkerService fieldWorkerService, FollowUpService followUpService) {
        this.prescriptionResponseRepository = prescriptionResponseRepository;
        this.olapPrescriptionRepository = olapPrescriptionRepository;
        this.patientService = patientService;
        this.userService = userService;
        this.formService = formService;
        this.formResponseService = formResponseService;
        this.icd10CodeService = icd10CodeService;
        this.pdfGenerator = pdfGenerator;
        this.pdfStorageRepository = pdfStorageRepository;
        this.fieldWorkerService = fieldWorkerService;
        this.followUpService = followUpService;
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

        int interval = olapPrescription.getFollowUpDetails().getInterval();
        int repeatFrequency = olapPrescription.getFollowUpDetails().getRepeatFrequency();
        boolean isFollowUpCompleted = false;
        FollowUp followUp = null;
        if ( interval != 0 && repeatFrequency != 0 ) {
            Date date = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String formattedDate = formatter.format(date);
            Timestamp timestamp = Timestamp.valueOf(formattedDate);
            followUp = new FollowUp(repeatFrequency, interval, timestamp, 0);
            FollowUp savedFollowUp = followUpService.saveFollowUp(followUp);
            followUp = savedFollowUp;
        } else {
            isFollowUpCompleted = true;
        }

        String pdfContent = pdfGenerator.generatePrescriptionPdf(doctor, patient, olapPrescription);
        PdfStorage pdfStorage = new PdfStorage();
        pdfStorage.setContent(pdfContent);
        PdfStorage savedPDF = pdfStorageRepository.save(pdfStorage);

        OlapPrescription savedOlapPrescription = olapPrescriptionRepository.save(olapPrescription);
        System.out.println(savedOlapPrescription.getId());

        PrescriptionResponse prescriptionResponse = new PrescriptionResponse(form, fieldWorker, patient, doctor, savedOlapPrescription.getId(), icdCode, savedPDF, followUp, isFollowUpCompleted);
        PrescriptionResponse savedPrescriptionResponse = prescriptionResponseRepository.save(prescriptionResponse);

        return savedPrescriptionResponse;

    }

    @Override
    public List<FieldWorkerFollowUp> getFollowUpsOfFieldWorker(String fieldworkerEmpId) {
        FieldWorker fieldWorker = fieldWorkerService.getFieldWorkerByEmpId(fieldworkerEmpId);
        List<PrescriptionResponse> prescriptions = prescriptionResponseRepository.findByFieldWorkerAndFollowUpCompleteIsFalse(fieldWorker);

        System.out.println(prescriptions.size());

        List<FieldWorkerFollowUp> fieldWorkerFollowUps = new ArrayList<>();
        for (PrescriptionResponse prescriptionResponse : prescriptions) {
            System.out.println("................. New prescription ");
            FollowUp followUp = prescriptionResponse.getFollowUp();

            LocalDate today = LocalDate.now();
            Timestamp mrfdTimestamp = followUp.getMostRecentFollowUpDate();
            LocalDate mrfd = mrfdTimestamp.toLocalDateTime().toLocalDate();

            System.out.println(today);
            System.out.println(mrfd);

            long daysBetween = ChronoUnit.DAYS.between(mrfd, today);
            System.out.println(daysBetween);

            if (daysBetween >= followUp.getIntervalInDays()) {
                Patient patient = prescriptionResponse.getPatient();
                Demographic demographic = patient.getDemographic();
                String fieldworkerFollowUpType = "";
                String currentFollowUpDate = mrfd.plusDays(followUp.getIntervalInDays()).toString();
                if ( daysBetween > followUp.getIntervalInDays() ) {
                    fieldworkerFollowUpType = "Pending";
                    System.out.println("pending");
                } else if ( daysBetween == followUp.getIntervalInDays() ) {
                    fieldworkerFollowUpType = "Today";
                    System.out.println("do it today");
                }

                String formTitle = prescriptionResponse.getForm().getTitle();

                System.out.println(patient.getPatientNumber());
                List<FormResponse> formResponses = formResponseService.findByPatient(patient);
                for (FormResponse formResponse : formResponses) {
                    System.out.println(formResponse.getFormResponseId() + " " + formResponse.getSubmittedOn() + " " + formResponse.getPatient().getPatientNumber());
                }
                FormResponse formResponse = formResponseService.findTopByPatientOrderBySubmittedOnDesc(patient);
                System.out.println("from id " + formResponse.getFormResponseId());
                FieldWorkerFollowUp fieldWorkerFollowUp = new FieldWorkerFollowUp(patient.getPatientNumber(), demographic,
                        currentFollowUpDate, fieldworkerFollowUpType, formTitle, formResponse.getSubmittedOn(), formResponse.getPdfStorage());
                fieldWorkerFollowUps.add(fieldWorkerFollowUp);
            }

        }

        fieldWorkerFollowUps = fieldWorkerFollowUps.stream()
                .sorted(Comparator.comparing(FieldWorkerFollowUp::getSubmittedOn).reversed())
                .collect(Collectors.toList());
        return fieldWorkerFollowUps;
    }
}
