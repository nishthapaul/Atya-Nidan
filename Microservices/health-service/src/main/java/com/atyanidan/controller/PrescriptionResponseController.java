package com.atyanidan.controller;

import com.atyanidan.entity.PrescriptionResponse;
import com.atyanidan.entity.elasticsearch.OlapPrescription;
import com.atyanidan.service.PrescriptionResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/prescription-responses")
public class PrescriptionResponseController {

    private final PrescriptionResponseService prescriptionResponseService;

    @Autowired
    public PrescriptionResponseController(PrescriptionResponseService prescriptionResponseService) {
        this.prescriptionResponseService = prescriptionResponseService;
    }

    @PostMapping
    public ResponseEntity<PrescriptionResponse> addPrescription(@RequestBody OlapPrescription olapPrescription) {
        PrescriptionResponse savedPrescriptionResponse = prescriptionResponseService.createPrescriptionResponse(olapPrescription);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPrescriptionResponse);
    }
}
