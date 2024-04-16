package com.atyanidan.controller;

import com.atyanidan.response.PatientDemographicDetailsResponse;
import com.atyanidan.service.AbhaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AbhaController {
    private final AbhaService abhaService;

    @Autowired
    public AbhaController(AbhaService abhaService) {
        this.abhaService = abhaService;
    }

    @PostMapping("/abha/demographics")
    public PatientDemographicDetailsResponse getPersonDemographics(@RequestBody String abhaNumber) {
        return abhaService.getPatientDemographicDetails(abhaNumber);
    }
}
