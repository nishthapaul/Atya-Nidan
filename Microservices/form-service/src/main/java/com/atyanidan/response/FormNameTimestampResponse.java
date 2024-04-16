package com.atyanidan.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormNameTimestampResponse {
    int formResponseId;
    String title;
    private Timestamp submittedOn;
}
