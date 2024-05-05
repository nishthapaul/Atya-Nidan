package com.atyanidan.entity.mysql;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private int formResponseId;

    @ManyToOne
    @JoinColumn(name = "form_id")
    @NotNull
    private Form form;

    @ManyToOne
    @JoinColumn(name = "fieldworker_id")
    @NotNull
    private FieldWorker fieldWorker;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @NotNull
    private Patient patient;

    @Column(name = "submitted_on", insertable = false, columnDefinition = "DEFAULT CURRENT_TIMESTAMP")
    private Timestamp submittedOn;

    @Column(name = "olap_form_id")
    @NotEmpty
    private String olapFormId;

    @Enumerated(EnumType.STRING)
    @Column(name = "form_type")
    @NotNull
    private FormType formType;

    @JoinColumn(name = "pdf_storage_id")
    @OneToOne
    private PdfStorage pdfStorage;

    public FormResponse(@NotNull Form form, @NotNull FieldWorker fieldWorker, @NotNull Patient patient, String olapFormId, FormType formType, PdfStorage pdfStorage) {
        this.form = form;
        this.fieldWorker = fieldWorker;
        this.patient = patient;
        this.olapFormId = olapFormId;
        this.formType = formType;
        this.pdfStorage = pdfStorage;
    }
}
