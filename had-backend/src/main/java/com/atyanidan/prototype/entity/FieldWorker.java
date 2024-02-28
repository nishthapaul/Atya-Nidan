package com.atyanidan.prototype.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "Fieldworker")
public class FieldWorker {
    @Id
    @Column(name = "fieldworker_id")
    private int fieldWorkerId;

    @OneToOne
    @JoinColumn(name = "fieldworker_id")
    private User user;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "address")
    private String address;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH}, fetch = FetchType.EAGER)
    @JoinColumn(name = "taluka_id")
    @JsonManagedReference(value = "fieldworker-taluka")
    private Taluka taluka;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "is_available")
    private boolean isAvailable;

    public FieldWorker() {
    }

    public FieldWorker(String firstName, String lastName, String address, Date dob, boolean isAvailable) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.dob = dob;
        this.isAvailable = isAvailable;
    }

    public int getFieldWorkerId() {
        return fieldWorkerId;
    }

    public void setFieldWorkerId(int fieldWorkerId) {
        this.fieldWorkerId = fieldWorkerId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public Taluka getTaluka() {
        return taluka;
    }

    public void setTaluka(Taluka taluka) {
        this.taluka = taluka;
    }

    @Override
    public String toString() {
        return "FieldWorker{" +
                "fieldWorkerId=" + fieldWorkerId +
                ", user=" + user +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", address='" + address + '\'' +
                ", taluka=" + taluka +
                ", dob=" + dob +
                ", isAvailable=" + isAvailable +
                '}';
    }
}
