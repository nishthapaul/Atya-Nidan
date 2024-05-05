package com.atyanidan.controller;

import com.atyanidan.entity.HealthRecord;
import com.atyanidan.entity.Patient;
import com.atyanidan.entity.actor.Admin;
import com.atyanidan.model.PatientDataResponse;
import com.atyanidan.model.PatientDemographicDetailsResponse;
import com.atyanidan.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Health Service", description = "APIs part of the Health service")
@RequestMapping("/api")
public class PatientController {
    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @Operation(summary = "Retrieve Forms and Prescription", description = "Retrieve Forms and Prescription given the patient number")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {@Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = HealthRecord.class)))}),
            @ApiResponse(responseCode = "404", description = "No Records found",
                    content = @Content)
    })
    @GetMapping("/{patientNumber}")
    public List<HealthRecord> getFormsAndPrescriptionsByPatientNumber(
            @Parameter(name = "patientNumber", description = "Patient ID", required = true)
            @PathVariable String patientNumber) {
        return patientService.getFormsAndPrescriptionsByPatientNumber(patientNumber);
    }

    @Operation(summary = "Retrieve Patients", description = "Retrieve the list of all the patients of a given doctor")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {@Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = PatientDataResponse.class)))}),
            @ApiResponse(responseCode = "404", description = "No Patients found",
                    content = @Content)
    })
    @GetMapping("/doctors/{doctorNumber}/patients")
    public List<PatientDataResponse> getPatientsByDoctorId(
            @Parameter(name = "doctorNumber", description = "Doctor ID", required = true)
            @PathVariable String doctorNumber){
        return patientService.getPatientsByDoctorId(doctorNumber);
    }

    @GetMapping("/patients/{patientNumber}/demographics")
    public PatientDemographicDetailsResponse getPersonDemographics(@PathVariable String patientNumber) {
        System.out.println("hi there");
        return patientService.getPatientDemographicDetails(patientNumber);
    }


}
