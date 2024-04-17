package com.atyanidan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "Demographic")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Demographic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "demographic_id")
    @JsonIgnore
    private int id;

    @Column(name = "first_name")
    @NotEmpty
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    @NotEmpty
    private String lastName;

    @Column(name = "address")
    @NotEmpty
    private String address;

    @Column(name = "dob")
    @NotEmpty
    private Date dob;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    @NotNull
    private Gender gender;

    @Column(name = "blood_group")
    @NotEmpty
    private String bloodGroup;

    @ManyToOne
    @JoinColumn(name = "taluka_id")
    @NotNull
    private Taluka taluka;

    @Column(name = "phone_number")
    @NotEmpty
    private String phoneNumber;

    public Demographic(String firstName, String middleName, String lastName, String address, String phoneNumber, Date dob, @NotNull Gender gender, String bloodGroup, @NotNull Taluka taluka) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.dob = dob;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.taluka = taluka;
    }
}
