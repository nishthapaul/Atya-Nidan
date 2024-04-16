package com.atyanidan.service;

import com.atyanidan.entity.mysql.FormResponse;
import com.atyanidan.request.OlapFormRequest;
import com.atyanidan.response.FormNameTimestampResponse;

import java.util.List;

public interface FormResponseService {

    FormResponse createFormResponse(OlapFormRequest olapFormRequest);

    List<FormNameTimestampResponse> getFormsNameAndTimestampByPatientNumber(String patientNumber);
}
