package com.atyanidan.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ICD_Code")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ICDCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code_id")
    private int id;

    @Column(name = "code")
    @NotNull
    private String code;

    @Column(name = "description")
    private String description;

}
