package com.atyanidan.entity.elasticsearch;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.sql.Date;
import java.util.List;
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
    public static class FollowUpDetails {
        private int interval;
        private int repeatFrequency;
    }

    private PrescriptionDetails prescriptionDetails;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class PrescriptionDetails {
        private String age;
        private String height;
        private String weight;
        private List<Dosage> dosages;

        @AllArgsConstructor
        @NoArgsConstructor
        @Data
        public static class Dosage {
            private String days;
            private String name;
            private String morningDose;
            private String afternoonDose;
            private String eveningDose;
        }
    }

}
