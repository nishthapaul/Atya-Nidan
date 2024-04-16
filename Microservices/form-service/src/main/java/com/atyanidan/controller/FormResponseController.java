package com.atyanidan.controller;

import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.FormResponse;
import com.atyanidan.request.OlapFormRequest;
import com.atyanidan.response.FormNameTimestampResponse;
import com.atyanidan.service.FormResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-responses")
public class FormResponseController {

    private final FormResponseService formResponseService;

    @Autowired
    public FormResponseController(FormResponseService formResponseService) {
        this.formResponseService = formResponseService;
    }

    @PostMapping
    public ResponseEntity<FormResponse> addForm(@RequestBody OlapFormRequest olapFormRequest) {
        FormResponse savedFormResponse = formResponseService.createFormResponse(olapFormRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFormResponse);
    }

    @GetMapping("/patient/{patientNumber}")
    public List<FormNameTimestampResponse> getFormResponsesByPatientNumber(@PathVariable String patientNumber) {
        return formResponseService.getFormsNameAndTimestampByPatientNumber(patientNumber);
    }
}
