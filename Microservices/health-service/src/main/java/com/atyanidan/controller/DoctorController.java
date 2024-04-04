package com.atyanidan.controller;

import com.atyanidan.entity.actor.Doctor;
import com.atyanidan.service.DoctorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Doctor", description = "APIs for implementing functionalities of Doctor")
public class DoctorController {
    private final DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @Operation(summary = "Retrieve doctors", description = "Retrieve the list of doctors given the district ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Doctor.class)))}),
            @ApiResponse(responseCode = "404", description = "No doctors found",
                    content = @Content)
    })
    @GetMapping("/districts/{districtId}/doctors")
    public List<Doctor> getDoctorsFromDistrictId(
            @Parameter(name = "districtId", description = "District ID", required = true)
            @PathVariable int districtId) {
        return doctorService.getDoctorsFromDistrictId(districtId);
    }

    @Operation(summary = "Add a doctor", description = "Add a new doctor")
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Doctor.class))}),
            @ApiResponse(responseCode = "500", description = "Could not add doctor",
                    content = @Content)
    })
    @PostMapping(path = "/talukas/{talukaId}/doctors", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Doctor> addDoctor(
            @Parameter(name = "talukaId", description = "Taluka ID", required = true)
            @PathVariable int talukaId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Doctor to add", required = true, content = @Content(schema = @Schema(implementation = Doctor.class)))
            @Valid @RequestBody Doctor doctor) throws Exception {
        Doctor dbDoctor = doctorService.addDoctor(talukaId, doctor);
        return ResponseEntity.status(HttpStatus.CREATED).body(dbDoctor);
    }
}
