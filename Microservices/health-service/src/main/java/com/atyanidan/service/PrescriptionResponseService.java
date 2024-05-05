package com.atyanidan.service;

import com.atyanidan.entity.FieldWorkerFollowUp;
import com.atyanidan.entity.PrescriptionResponse;
import com.atyanidan.entity.elasticsearch.OlapPrescription;
import com.itextpdf.text.DocumentException;

import java.util.List;

public interface PrescriptionResponseService {
    PrescriptionResponse createPrescriptionResponse(OlapPrescription olapPrescription) throws DocumentException;

    List<FieldWorkerFollowUp> getFollowUpsOfFieldWorker(String fieldworkerId);
}
