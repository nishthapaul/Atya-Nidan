package com.atyanidan.service;

import com.atyanidan.dao.OlapFormRepository;
import com.atyanidan.dao.PatientRepository;
import com.atyanidan.dao.PrescriptionResponseRepository;
import com.atyanidan.entity.*;
import com.atyanidan.entity.actor.Doctor;
import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.exception.NotFoundException;
import com.atyanidan.model.PatientDataResponse;
import com.atyanidan.model.PatientDemographicDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final FormResponseService formResponseService;
    private final PrescriptionResponseRepository prescriptionResponseRepository;
    private final OlapFormRepository olapFormRepository;
    private final UserService userService;

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository, FormResponseService formResponseService, PrescriptionResponseRepository prescriptionResponseRepository, OlapFormRepository olapFormRepository, UserService userService) {
        this.patientRepository = patientRepository;
        this.formResponseService = formResponseService;
        this.prescriptionResponseRepository = prescriptionResponseRepository;
        this.olapFormRepository = olapFormRepository;
        this.userService = userService;
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
            records.add(new HealthRecord(formResponse.getFormResponseId(), formResponse.getForm().getTitle() + suffix, formResponse.getSubmittedOn(), 1,"Form"));
        }

        for (PrescriptionResponse prescriptionResponse : prescriptionResponses) {
            records.add(new HealthRecord(prescriptionResponse.getPrescriptionResponseId(), prescriptionResponse.getForm().getTitle(), prescriptionResponse.getSubmittedOn(), prescriptionResponse.getPdfStorage().getId(), "Prescription"));
        }

        records = records.stream()
                .sorted(Comparator.comparing(HealthRecord::getSubmittedOn).reversed())
                .collect(Collectors.toList());

        System.out.println(records);

        return records;
    }

    @Override
    public List<PatientDataResponse> getPatientsByDoctorId(String doctorNumber) {
        List<PatientDataResponse> patientDataResponses = new ArrayList<>();
        Doctor doctor = (Doctor) userService.getUserFromEmployeeId(doctorNumber);
        if(doctor == null) {
            throw new NotFoundException("Doctor doesn't exist");
        }
        List<PrescriptionResponse> prescriptionResponses = prescriptionResponseRepository.findByDoctor(doctor, Sort.by(Sort.Direction.DESC, "submittedOn"));

        prescriptionResponses = getDistinctPatientData(prescriptionResponses);

        for (PrescriptionResponse prescriptionResponse : prescriptionResponses) {
            PatientDataResponse response = new PatientDataResponse();
            response.setPatientNumber(prescriptionResponse.getPatient().getPatientNumber());
            String name = prescriptionResponse.getPatient().getDemographic().getFirstName() + " " + prescriptionResponse.getPatient().getDemographic().getLastName();
            response.setPatientName(name);
            response.setPhoneNumber(prescriptionResponse.getPatient().getDemographic().getPhoneNumber());
            response.setTaluka(prescriptionResponse.getPatient().getDemographic().getTaluka().getName());
            response.setVisitDate(prescriptionResponse.getSubmittedOn());
            String fieldworkerName = prescriptionResponse.getFieldWorker().getFirstName() + " " + prescriptionResponse.getFieldWorker().getLastName();
            response.setFieldWorkerName(fieldworkerName);

            patientDataResponses.add(response);
        }

        return patientDataResponses;
    }

    @Override
    public PatientDemographicDetailsResponse getPatientDemographicDetails(String patientNumber) {
        Patient patient = findByPatientNumber(patientNumber);
        return new PatientDemographicDetailsResponse(patientNumber, patient.getDemographic());
    }

    private List<PrescriptionResponse> getDistinctPatientData(List<PrescriptionResponse> prescriptionResponses) {
        Map<Patient, PrescriptionResponse> map = new HashMap<>();
        for (PrescriptionResponse response : prescriptionResponses) {
            Patient patient = response.getPatient();
            if ( !map.containsKey(patient) ) {
                map.put(patient, response);
            }
        }
        List<PrescriptionResponse> responsesListWithoutDuplicates = new ArrayList<>();
        for (Patient patient : map.keySet()) {
            responsesListWithoutDuplicates.add(map.get(patient));
        }
        responsesListWithoutDuplicates = responsesListWithoutDuplicates.stream()
                .sorted(Comparator.comparing(PrescriptionResponse::getSubmittedOn).reversed())
                .collect(Collectors.toList());
        return responsesListWithoutDuplicates;

    }

}
