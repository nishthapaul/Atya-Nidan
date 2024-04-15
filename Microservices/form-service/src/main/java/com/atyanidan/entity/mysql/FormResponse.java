package com.atyanidan.entity.mysql;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.Timestamp;

@Entity
@Table(name = "Form_Response")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long formResponseId;

    @ManyToOne
    @JoinColumn(name = "form_id")
    @NotNull
    private Form form;

    @ManyToOne
    @JoinColumn(name = "fieldworker_id")
    @NotNull
    private FieldWorker fieldWorker;

//    @ManyToOne
//    @JoinColumn(name = "patient_id")
//    private Patient patient;

    @Column(name = "submitted_on", insertable = false, columnDefinition = "DEFAULT CURRENT_TIMESTAMP")
    private Timestamp submittedOn;

    @Column(name = "olap_form_id")
    @NotEmpty
    private String olapFormId;

    public FormResponse(@NotNull Form form, @NotNull FieldWorker fieldWorker, String olapFormId) {
        this.form = form;
        this.fieldWorker = fieldWorker;
        this.olapFormId = olapFormId;
    }
}
