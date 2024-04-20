package com.atyanidan.entity.elasticsearch;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(indexName = "olap_prescription")
public class OlapPrescription {
    @Id
    @JsonIgnore
    private String id;

    private String formTitle;

    private String patientNumber;

    private String doctorId; // This is empId of doctor

    private FollowUpDetails followUpDetails;

    private String notes;

    private String icdCode;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    private static class FollowUpDetails {
        private int interval;
        private int repeatFrequency;
    }

    private Map<String, Object> prescriptionDetails;
}
