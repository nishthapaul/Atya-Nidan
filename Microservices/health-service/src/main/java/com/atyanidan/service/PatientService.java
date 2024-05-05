package com.atyanidan.service;

import com.atyanidan.entity.HealthRecord;
import com.atyanidan.entity.Patient;
import com.atyanidan.model.PatientDataResponse;
import com.atyanidan.model.PatientDemographicDetailsResponse;

import java.util.List;

public interface PatientService {
    Patient findByPatientNumber(String patientNumber);

    List<HealthRecord> getFormsAndPrescriptionsByPatientNumber(String patientNumber);

    List<PatientDataResponse> getPatientsByDoctorId(String doctorNumber);

    PatientDemographicDetailsResponse getPatientDemographicDetails(String patientNumber);
}
