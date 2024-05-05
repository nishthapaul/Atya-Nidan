package com.atyanidan.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Calendar;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FieldWorkerFollowUp {
    String patientNumber;
    Demographic demographic;
    String currentFollowUpDate;
    String fieldworkerFollowUpType;
    String formTitle;
    Timestamp submittedOn;
    PdfStorage pdfStorage;

    public Timestamp getSubmittedOn() {
        long millis = submittedOn.getTime();
        long additionalMillis = (long) (5.5 * 3600000.0);
        long newMillis = millis + additionalMillis;
        return new Timestamp(newMillis);
    }
}
