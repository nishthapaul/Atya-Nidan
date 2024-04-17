package com.atyanidan.service;

import com.atyanidan.entity.PrescriptionResponse;
import com.atyanidan.entity.elasticsearch.OlapPrescription;

public interface PrescriptionResponseService {
    PrescriptionResponse createPrescriptionResponse(OlapPrescription olapPrescription);
}
