package com.atyanidan.controller;

import com.atyanidan.entity.FieldWorkerFollowUp;
import com.atyanidan.service.PrescriptionResponseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Health Service", description = "APIs part of the Health service")
public class FieldWorkerFollowUpController {
    private final PrescriptionResponseService prescriptionResponseService;

    public FieldWorkerFollowUpController(PrescriptionResponseService prescriptionResponseService) {
        this.prescriptionResponseService = prescriptionResponseService;
    }

    @Operation(summary = "Retrieve list of fieldworkers", description = "Retrieve the list of all the fieldworkers of a given taluka")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = FieldWorkerFollowUp.class))) }),
            @ApiResponse(responseCode = "404", description = "No fieldworkers found",
                    content = @Content)
    })
    @GetMapping("/fieldworkers/{fieldworkerId}/followups")
    public List<FieldWorkerFollowUp> getFollowUpsByFieldWorker(@PathVariable String fieldworkerId) {
        return prescriptionResponseService.getFollowUpsOfFieldWorker(fieldworkerId);
    }
}
