package com.atyanidan.entity.actor;

import com.atyanidan.entity.District;
import com.atyanidan.entity.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

@Entity
@Table(name = "Admin")
@PrimaryKeyJoinColumn(name = "admin_id")
public class Admin extends User {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @OneToOne
    @JoinColumn(name = "district_id", unique = true)
    @NotNull
    private District district;

    @Column(name = "dob")
    private Date dob;

    public Admin() {
    }

    public Admin(String firstName, String middleName, String lastName, String homeAddress, String officeAddress, Gender gender, Date dob) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.homeAddress = homeAddress;
        this.officeAddress = officeAddress;
        this.gender = gender;
        this.dob = dob;
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

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
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
}
