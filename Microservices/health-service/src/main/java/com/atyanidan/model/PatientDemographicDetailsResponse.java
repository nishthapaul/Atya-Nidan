package com.atyanidan.model;

import com.atyanidan.entity.Demographic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDemographicDetailsResponse {
    String patientNumber;
    private Demographic demographic;
}
