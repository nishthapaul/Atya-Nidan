package com.atyanidan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Patient")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    @JsonIgnore
    private int id;

    @Column(name = "abha_number")
    @NotEmpty
    protected String abhaNumber;

    @Column(name = "patient_number")
    @NotEmpty
    private String patientNumber;

    @OneToOne
    @JoinColumn(name = "demographic_id")
    @NotEmpty
    private Demographic demographic;

    public Patient(String abhaNumber, Demographic demographic) {
        this.abhaNumber = abhaNumber;
        this.demographic = demographic;
    }
}
