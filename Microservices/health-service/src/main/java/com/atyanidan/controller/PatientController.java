package com.atyanidan.controller;

import com.atyanidan.entity.HealthRecord;
import com.atyanidan.entity.Patient;
import com.atyanidan.model.PatientDataResponse;
import com.atyanidan.model.PatientDemographicDetailsResponse;
import com.atyanidan.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PatientController {
    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/patients/{patientNumber}/health-records")
    public List<HealthRecord> getFormsAndPrescriptionsByPatientNumber(@PathVariable String patientNumber) {
        return patientService.getFormsAndPrescriptionsByPatientNumber(patientNumber);
    }

    @GetMapping("/doctors/{doctorNumber}/patients")
    public List<PatientDataResponse> getPatientsByDoctorId(@PathVariable String doctorNumber){
        return patientService.getPatientsByDoctorId(doctorNumber);
    }

    @GetMapping("/patients/{patientNumber}/demographics")
    public PatientDemographicDetailsResponse getPersonDemographics(@PathVariable String patientNumber) {
        System.out.println("hi there");
        return patientService.getPatientDemographicDetails(patientNumber);
    }


}
