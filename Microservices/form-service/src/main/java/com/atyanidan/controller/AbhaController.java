package com.atyanidan.controller;

import com.atyanidan.response.PatientDemographicDetailsResponse;
import com.atyanidan.service.AbhaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/abha")
public class AbhaController {
    private final AbhaService abhaService;

    @Autowired
    public AbhaController(AbhaService abhaService) {
        this.abhaService = abhaService;
    }

    @GetMapping("/{abhaNumber}/demographics")
    public PatientDemographicDetailsResponse getPersonDemographics(@PathVariable String abhaNumber) {
        return abhaService.getPatientDemographicDetails(abhaNumber);
    }
}
