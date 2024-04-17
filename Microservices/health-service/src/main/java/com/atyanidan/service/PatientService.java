package com.atyanidan.service;

import com.atyanidan.entity.Patient;

public interface PatientService {
    Patient findByPatientNumber(String patientNumber);
}
