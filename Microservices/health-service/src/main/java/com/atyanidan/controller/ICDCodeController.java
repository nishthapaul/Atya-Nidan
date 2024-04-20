package com.atyanidan.controller;

import com.atyanidan.entity.ICDCode;
import com.atyanidan.service.ICD10CodeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/icd10Codes")
@Tag(name = "ICD10Code", description = "API for fetching ICD10Codes")
public class ICDCodeController {
    private final ICD10CodeService icd10CodeService;

    @Autowired
    public ICDCodeController(ICD10CodeService icd10CodeService) {
        this.icd10CodeService = icd10CodeService;
    }

    @GetMapping
    public List<ICDCode> getAllICD10Codes() {
        return icd10CodeService.findAllICDCodes();
    }

    @GetMapping("/{code}")
    public ICDCode getAllICD10Codes(@PathVariable String code) {
        return icd10CodeService.findByCode(code);
    }
}
