package com.atyanidan.service;

import com.atyanidan.entity.mysql.Abha;
import com.atyanidan.response.PatientDemographicDetailsResponse;

public interface AbhaService {
    public Abha getAbhaByAbhaNumber(String abhaNumber);

    PatientDemographicDetailsResponse getPatientDemographicDetails(String abhaNumber);
}
