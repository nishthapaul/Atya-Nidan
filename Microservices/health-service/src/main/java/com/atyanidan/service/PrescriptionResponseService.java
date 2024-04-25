package com.atyanidan.service;

import com.atyanidan.entity.PrescriptionResponse;
import com.atyanidan.entity.elasticsearch.OlapPrescription;
import com.itextpdf.text.DocumentException;

public interface PrescriptionResponseService {
    PrescriptionResponse createPrescriptionResponse(OlapPrescription olapPrescription) throws DocumentException;
}
