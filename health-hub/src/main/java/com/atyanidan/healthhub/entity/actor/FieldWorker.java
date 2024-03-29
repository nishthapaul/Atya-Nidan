package com.atyanidan.healthhub.entity.actor;

import com.atyanidan.healthhub.entity.Taluka;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.bind.DefaultValue;

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

    @Column(name = "gender")
    private String gender;

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

    public FieldWorker() {
    }

    public FieldWorker(String firstName, String middleName, String lastName, String homeAddress, String officeAddress, String gender, Date dob, String bloodGroup, String aadharNumber, String nearestRailwayStation, Boolean available) {
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
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
}
