package com.atyanidan.entity;

import com.atyanidan.entity.actor.Doctor;
import com.atyanidan.entity.actor.FieldWorker;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "Prescription_Response")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int prescriptionResponseId;

    @ManyToOne
    @JoinColumn(name = "form_id")
    @NotNull
    private Form form;

    @ManyToOne
    @JoinColumn(name = "fieldworker_id")
    @NotNull
    private FieldWorker fieldWorker;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @NotNull
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    @NotNull
    private Doctor doctor;

    @Column(name = "submitted_on", insertable = false, columnDefinition = "DEFAULT CURRENT_TIMESTAMP")
    private Timestamp submittedOn;

    @Column(name = "olap_prescription_id")
    @NotEmpty
    private String olapPrescriptionId;

    public PrescriptionResponse(@NotNull Form form, @NotNull FieldWorker fieldWorker, @NotNull Patient patient, @NotNull Doctor doctor, String olapPrescriptionId) {
        this.form = form;
        this.fieldWorker = fieldWorker;
        this.patient = patient;
        this.doctor = doctor;
        this.olapPrescriptionId = olapPrescriptionId;
    }
}
