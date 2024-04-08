package com.atyanidan.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "ICD10_Code")
@Data
public class ICD10Code {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code_id")
    private int codeId;

    @Column(name = "code")
    @NotNull
    private String code;

    @Column(name = "description")
    private String description;

}
