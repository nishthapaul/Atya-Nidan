package com.atyanidan.controller;

import com.atyanidan.entity.HealthRecord;
import com.atyanidan.entity.Patient;
import com.atyanidan.model.PatientDataResponse;
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

    @GetMapping("/doctors/{doctorNumber}/patients")
    public List<PatientDataResponse> getPatientsByDoctorId(@PathVariable String doctorNumber){
        return patientService.getPatientsByDoctorId(doctorNumber);
    }
}
