package com.atyanidan.controller;

import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.FormResponse;
import com.atyanidan.request.OlapFormRequest;
import com.atyanidan.response.FormNameTimestampResponse;
import com.atyanidan.service.FormResponseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/form-responses")
@Tag(name = "Form Service", description = "APIs part of the Form service")
public class FormResponseController {

    private final FormResponseService formResponseService;

    @Autowired
    public FormResponseController(FormResponseService formResponseService) {
        this.formResponseService = formResponseService;
    }

    @Operation(summary = "Add a form", description = "Add a form")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = OlapForm.class))) }),
            @ApiResponse(responseCode = "500", description = "Could not add form",
                    content = @Content)
    })
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

    @Operation(summary = "Retrieve list of Form Responses", description = "Retrieve the list of all the form responses of a patient")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = FormNameTimestampResponse.class))) }),
            @ApiResponse(responseCode = "404", description = "No fieldworkers found",
                    content = @Content)
    })
    @GetMapping("/patient/{patientNumber}")
    public List<FormNameTimestampResponse> getFormResponsesByPatientNumber(
            @Parameter(name = "patientNumber", description = "Patient ID", required = true)
            @PathVariable String patientNumber) {
        return formResponseService.getFormsNameAndTimestampByPatientNumber(patientNumber);
    }
}
