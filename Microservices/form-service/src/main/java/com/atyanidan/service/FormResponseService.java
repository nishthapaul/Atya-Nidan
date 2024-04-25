package com.atyanidan.service;

import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.request.OlapFormRequest;
import com.atyanidan.response.FormNameTimestampResponse;

import java.util.List;

public interface FormResponseService {

    OlapForm createFormResponse(OlapFormRequest olapFormRequest);

    List<FormNameTimestampResponse> getFormsNameAndTimestampByPatientNumber(String patientNumber);
}
