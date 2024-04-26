package com.atyanidan.controller;

import com.atyanidan.entity.FieldWorkerFollowUp;
import com.atyanidan.service.PrescriptionResponseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FieldWorkerFollowUpController {
    private final PrescriptionResponseService prescriptionResponseService;

    public FieldWorkerFollowUpController(PrescriptionResponseService prescriptionResponseService) {
        this.prescriptionResponseService = prescriptionResponseService;
    }

    @GetMapping("/fieldworkers/{fieldworkerId}/followups")
    public List<FieldWorkerFollowUp> getFollowUpsByFieldWorker(@PathVariable String fieldworkerId) {
        return prescriptionResponseService.getFollowUpsOfFieldWorker(fieldworkerId);
    }
}
