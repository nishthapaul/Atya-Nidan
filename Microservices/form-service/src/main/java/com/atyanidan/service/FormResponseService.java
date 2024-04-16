package com.atyanidan.service;

import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.FormResponse;
import com.atyanidan.response.FormNameTimestampResponse;

import java.util.List;

public interface FormResponseService {

    FormResponse createFormResponse(OlapForm olapForm);

    List<FormNameTimestampResponse> getFormsNameAndTimestampByPatientNumber(String patientNumber);
}
