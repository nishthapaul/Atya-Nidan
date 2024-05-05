package com.atyanidan.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "Form")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int formId;

    @Column(name = "title")
    private String title;

    @Column(name = "selected", insertable = false)
    private Boolean selected;

    @Column(name = "created_on", updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdOn;

    @Column(name = "form_definition_id")
    private String formDefinitionId;

    @ManyToOne
    @JoinColumn(name = "specialisation_id")
    private Specialisation specialisation;

    public Form(String title, String formDefinitionId, Specialisation specialisation) {
        this.title = title;
        this.formDefinitionId = formDefinitionId;
        this.specialisation = specialisation;
    }

}
