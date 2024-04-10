package com.atyanidan.entity.actor;

import com.atyanidan.entity.Gender;
import com.atyanidan.entity.State;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "Super_Admin")
@PrimaryKeyJoinColumn(name = "super_admin_id")
@Getter
@Setter
public class SuperAdmin extends User{
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
    @JoinColumn(name = "state_id", unique = true)
    @NotNull
    private State state;

    @Column(name = "dob")
    private Date dob;
}
