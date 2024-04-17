package com.atyanidan.service;

import com.atyanidan.entity.FormResponse;

public interface FormResponseService {
    FormResponse findLatestByFormIdAndPatientId(int formId, int patientId, String formTitle);
}
