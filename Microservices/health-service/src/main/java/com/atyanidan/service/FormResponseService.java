package com.atyanidan.service;

import com.atyanidan.entity.FormResponse;
import com.atyanidan.entity.Patient;

import java.util.List;

public interface FormResponseService {
    FormResponse findLatestByFormIdAndPatientId(int formId, int patientId, String formTitle);

    List<FormResponse> findByPatient(Patient patient);
}
