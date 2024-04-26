package com.atyanidan.service;

import com.atyanidan.entity.mysql.PrescriptionResponse;

public interface PrescriptionResponseService {

    PrescriptionResponse findLatestByFormIdAndPatientId(int formId, int patientId, String formTitle);
    PrescriptionResponse save(PrescriptionResponse prescriptionResponse);
}
