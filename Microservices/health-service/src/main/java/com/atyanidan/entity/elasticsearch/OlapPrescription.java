package com.atyanidan.entity.elasticsearch;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.sql.Date;
import java.util.List;

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

    private PrescriptionDetails prescriptionDetails;

    private String notes;

    private String icdCode;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    private static class FollowUpDetails {
        private Date from;
        private Date to;
        private int repeatFrequency;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    private static class PrescriptionDetails {
        private int age;
        private double height;
        private double weight;
        private List<Dosage> dosages;

        @AllArgsConstructor
        @NoArgsConstructor
        @Data
        private static class Dosage {
            private int days;
            private String name;
            private int morningDose;
            private int afternoonDose;
            private int eveningDose;
        }
    }
}
