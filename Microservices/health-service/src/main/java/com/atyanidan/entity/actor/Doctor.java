package com.atyanidan.entity.actor;

import com.atyanidan.entity.Gender;
import com.atyanidan.entity.Specialisation;
import com.atyanidan.entity.Taluka;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.sql.Date;

@Entity
@Table(name = "Doctor")
@PrimaryKeyJoinColumn(name = "doctor_id")
public class Doctor extends User {

    @Column(name = "first_name")
    @NotEmpty
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    @NotEmpty
    private String lastName;

    @Column(name = "home_address")
    @NotEmpty
    private String homeAddress;

    @Column(name = "hospital_address")
    @NotEmpty
    private String hospitalAddress;

    @Column(name = "nearest_railway_station")
    private String nearestRailwayStation;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "specialisation_id")
    @NotNull
    private Specialisation specialisation;

    @ManyToOne
    @JoinColumn(name = "taluka_id")
    @NotNull
    private Taluka taluka;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "blood_group")
    private String bloodGroup;

    @Column(name = "aadhar_number", unique = true)
    @NotNull
    @Size(max=12, min=12)
    @NotEmpty
    private String aadharNumber;

    @Column(name = "language_known_1")
    @NotEmpty
    private String languageKnown1;

    @Column(name = "language_known_2")
    private String languageKnown2;

    @Column(name = "language_known_3")
    private String languageKnown3;

    public Doctor() {
    }

    public Doctor(String firstName, String middleName, String lastName, String homeAddress, String hospitalAddress, Gender gender, Date dob, String bloodGroup, String aadharNumber, String nearestRailwayStation, Specialisation specialisation, String languageKnown1, String languageKnown2, String languageKnown3) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.homeAddress = homeAddress;
        this.hospitalAddress = hospitalAddress;
        this.gender = gender;
        this.dob = dob;
        this.bloodGroup = bloodGroup;
        this.aadharNumber = aadharNumber;
        this.nearestRailwayStation = nearestRailwayStation;
        this.specialisation = specialisation;
        this.languageKnown1 = languageKnown1;
        this.languageKnown2 = languageKnown2;
        this.languageKnown3 = languageKnown3;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getHomeAddress() {
        return homeAddress;
    }

    public void setHomeAddress(String homeAddress) {
        this.homeAddress = homeAddress;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public Taluka getTaluka() {
        return taluka;
    }

    public void setTaluka(Taluka taluka) {
        this.taluka = taluka;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }

    public String getNearestRailwayStation() {
        return nearestRailwayStation;
    }

    public void setNearestRailwayStation(String nearestRailwayStation) {
        this.nearestRailwayStation = nearestRailwayStation;
    }

    public String getHospitalAddress() {
        return hospitalAddress;
    }

    public void setHospitalAddress(String hospitalAddress) {
        this.hospitalAddress = hospitalAddress;
    }

    public Specialisation getSpecialisation() {
        return specialisation;
    }

    public void setSpecialisation(Specialisation specialisation) {
        this.specialisation = specialisation;
    }

    public String getLanguageKnown1() {
        return languageKnown1;
    }

    public void setLanguageKnown1(String languageKnown1) {
        this.languageKnown1 = languageKnown1;
    }

    public String getLanguageKnown2() {
        return languageKnown2;
    }

    public void setLanguageKnown2(String languageKnown2) {
        this.languageKnown2 = languageKnown2;
    }

    public String getLanguageKnown3() {
        return languageKnown3;
    }

    public void setLanguageKnown3(String languageKnown3) {
        this.languageKnown3 = languageKnown3;
    }
}
