package com.atyanidan.entity;

import com.atyanidan.entity.elasticsearch.FormDefinition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FieldWorkerFollowUp {
    String patientNumber;
    Demographic demographic;
    String currentFollowUpDate;
    String fieldworkerFollowUpType;
    String formTitle;
    FormDefinition formDefinition;
    Timestamp submittedOn;
}
