package com.atyanidan.entity.mysql;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "Form")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long formId;

    private Boolean selected;

    @Column(name = "created_on", updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdOn;

    private String formDefinitionId;

    public Form(Boolean selected, Timestamp createdOn, String formDefinitionId) {
        this.selected = selected;
        this.createdOn = createdOn;
        this.formDefinitionId = formDefinitionId;
    }

    public Form(Boolean selected, String formDefinitionId) {
        this.selected = selected;
        this.formDefinitionId = formDefinitionId;
    }


}
