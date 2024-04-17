package com.atyanidan.controller;

import com.atyanidan.entity.HealthRecord;
import com.atyanidan.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
public class PatientController {
    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/{patientNumber}")
    public List<HealthRecord> getFormsAndPrescriptionsByPatientNumber(@PathVariable String patientNumber) {
        return patientService.getFormsAndPrescriptionsByPatientNumber(patientNumber);
    }
}
