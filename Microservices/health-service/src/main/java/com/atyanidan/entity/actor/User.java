package com.atyanidan.entity.actor;

import com.atyanidan.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "User")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    @JsonIgnore
    protected int id;

    @Column(name = "phone_number", unique = true)
    @NotEmpty
    @Size(max=10, min=10)
    protected String phoneNumber;

    @Column(name = "email", unique = true)
    @NotEmpty
    protected String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    @NotNull
    protected Role role;

    @Column(name = "emp_id")
    protected String empId;

    public User() {
    }

    public User(String phoneNumber, String email, Role role, String empId) {
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.role = role;
        this.empId = empId;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
