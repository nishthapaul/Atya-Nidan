package com.atyanidan.entity;

import com.atyanidan.entity.actor.Doctor;
import com.atyanidan.entity.actor.FieldWorker;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "Visit")
@Data
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visit_id")
    private int visitId;

    @OneToOne
    @JoinColumn(name = "patient_id")
    @NotNull
    private Patient patient;

    @OneToOne
    @JoinColumn(name = "doctor_id")
    @NotNull
    private Doctor doctor;

    @OneToOne
    @JoinColumn(name = "field_worker_id")
    @NotNull
    private FieldWorker fieldWorker;

    @Column(name = "is_follow_up_completed")
    private boolean isFollowUpCompleted;

    @Column(name = "visit_date")
    private Date visitDate;

    @Column(name = "diagnosis_id")
    private int diagnosisId;

    @OneToOne
    @JoinColumn(name = "form_title")
    @NotNull
    private FormSkeleton formSkeleton;

}
