package com.atyanidan.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.sql.Date;

@Entity
@Table(name = "Patient")
@Data
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private int patientId;

    @Column(name = "first_name")
    @NotNull
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    @NotNull
    private String lastName;

    @Column(name = "home_address")
    @NotNull
    private String homeAddress;

    @Column(name = "phone_number", unique = true)
    @NotNull
    @Size(min = 10, max = 10)
    private String phoneNumber;

    @Column(name = "email", unique = true)
    @NotNull
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    @NotNull
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "taluka_id")
    @NotNull
    private Taluka taluka;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "blood_group")
    private String bloodGroup;
}
