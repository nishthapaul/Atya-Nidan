package com.atyanidan.entity.mysql;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "Abha")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Abha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "abha_id")
    @JsonIgnore
    private int id;

    @Column(name = "emp_id")
    protected String empId;

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
    private Date dob;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    @NotNull
    private Gender gender;

    @Column(name = "blood_group")
    private String bloodGroup;
}
