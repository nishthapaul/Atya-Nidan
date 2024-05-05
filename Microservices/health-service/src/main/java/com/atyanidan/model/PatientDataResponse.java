package com.atyanidan.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class PatientDataResponse {
    String patientNumber;
    String patientName;
    String taluka;
    String phoneNumber;
    Timestamp visitDate;
    String fieldWorkerName;
}
