package com.atyanidan.service;

import com.atyanidan.entity.HealthRecord;
import com.atyanidan.entity.Patient;

import java.util.List;

public interface PatientService {
    Patient findByPatientNumber(String patientNumber);

    List<HealthRecord> getFormsAndPrescriptionsByPatientNumber(String patientNumber);
}
