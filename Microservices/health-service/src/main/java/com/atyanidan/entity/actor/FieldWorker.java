package com.atyanidan.entity.actor;

import com.atyanidan.entity.Gender;
import com.atyanidan.entity.Taluka;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

@Entity
@Table(name = "Field_Worker")
@PrimaryKeyJoinColumn(name = "field_worker_id")
public class FieldWorker extends User {

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

    @Column(name = "office_address")
    @NotNull
    private String officeAddress;

    @Column(name = "nearest_railway_station")
    @NotNull
    private String nearestRailwayStation;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "taluka_id")
    @NotNull
    private Taluka taluka;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "blood_group")
    private String bloodGroup;

    @Column(name = "aadhar_number")
    private String aadharNumber;

    @Column(name = "available", columnDefinition = "DEFAULT 0")

    private Boolean available;

    @OneToOne
    @JoinColumn(name = "substitute_id")
    private FieldWorker substitute;

    @Column(name = "language_known_1")
    private String languageKnown1;

    @Column(name = "language_known_2")
    private String languageKnown2;

    @Column(name = "language_known_3")
    private String languageKnown3;

    public FieldWorker() {
    }

    public FieldWorker(String firstName, String middleName, String lastName, String homeAddress, String officeAddress, Gender gender, Date dob, String bloodGroup, String aadharNumber, String nearestRailwayStation, Boolean available, String languageKnown1, String languageKnown2, String languageKnown3) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.homeAddress = homeAddress;
        this.officeAddress = officeAddress;
        this.gender = gender;
        this.dob = dob;
        this.bloodGroup = bloodGroup;
        this.aadharNumber = aadharNumber;
        this.nearestRailwayStation = nearestRailwayStation;
        this.available = available;
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

    public String getOfficeAddress() {
        return officeAddress;
    }

    public void setOfficeAddress(String officeAddress) {
        this.officeAddress = officeAddress;
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

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Integer getSubstitute() {
        if (substitute != null)
            return substitute.getId();
        else
            return null;
    }

    public void setSubstitute(FieldWorker substitute) {
        this.substitute = substitute;
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
