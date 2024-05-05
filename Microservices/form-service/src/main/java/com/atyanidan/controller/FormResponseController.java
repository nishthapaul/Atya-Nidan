package com.atyanidan.controller;

import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.FormResponse;
import com.atyanidan.request.OlapFormRequest;
import com.atyanidan.response.FormNameTimestampResponse;
import com.atyanidan.service.FormResponseService;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    public ResponseEntity<List<OlapForm>> addForm(@RequestBody List<OlapFormRequest> olapFormRequests) throws DocumentException {
        System.out.println(olapFormRequests);
        List<OlapForm> olapForms = new ArrayList<>();
        for (OlapFormRequest olapFormRequest : olapFormRequests) {
            OlapForm savedFormResponse = formResponseService.createFormResponse(olapFormRequest);
            olapForms.add(savedFormResponse);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(olapForms);
    }

    @GetMapping("/patient/{patientNumber}")
    public List<FormNameTimestampResponse> getFormResponsesByPatientNumber(@PathVariable String patientNumber) {
        return formResponseService.getFormsNameAndTimestampByPatientNumber(patientNumber);
    }
}
