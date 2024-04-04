package com.atyanidan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "Languages_Known")
@Data
@PrimaryKeyJoinColumn(name = "field_worker_id")
public class LanguagesKnown {
    @Column(name = "language1")
    @NotNull
    private String language1;

    @Column(name = "language2")
    private String language2;

    @Column(name = "language3")
    private String language3;



}
