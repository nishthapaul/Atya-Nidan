package com.atyanidan.response;

import com.atyanidan.entity.mysql.Demographic;
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
