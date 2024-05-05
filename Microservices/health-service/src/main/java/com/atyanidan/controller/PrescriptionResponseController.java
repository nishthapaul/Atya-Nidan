package com.atyanidan.controller;

import com.atyanidan.entity.PrescriptionResponse;
import com.atyanidan.entity.actor.FieldWorker;
import com.atyanidan.entity.elasticsearch.OlapPrescription;
import com.atyanidan.service.PrescriptionResponseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/prescription-responses")
@Tag(name = "Health Service", description = "APIs part of the Health service")
public class PrescriptionResponseController {

    private final PrescriptionResponseService prescriptionResponseService;

    @Autowired
    public PrescriptionResponseController(PrescriptionResponseService prescriptionResponseService) {
        this.prescriptionResponseService = prescriptionResponseService;
    }

    @Operation(summary = "Add a prescription", description = "Add a prescription of a patient")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = PrescriptionResponse.class)) }),
            @ApiResponse(responseCode = "500", description = "Could not add prescription",
                    content = @Content)
    })
    @PostMapping(produces = "application/json", consumes = "application/json")
    public ResponseEntity<PrescriptionResponse> addPrescription(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Prescription to add", required = true, content = @Content(schema=@Schema(implementation = OlapPrescription.class)))
            @RequestBody OlapPrescription olapPrescription) throws DocumentException {
        PrescriptionResponse savedPrescriptionResponse = prescriptionResponseService.createPrescriptionResponse(olapPrescription);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPrescriptionResponse);
    }
}
