package com.atyanidan.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HealthRecord {
    private int responseId;
    private String title;
    private Timestamp submittedOn;
    private int pdfStorageId;
    private String type;
}
