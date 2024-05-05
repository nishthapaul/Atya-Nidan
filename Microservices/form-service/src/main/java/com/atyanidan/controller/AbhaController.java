package com.atyanidan.controller;

import com.atyanidan.response.PatientDemographicDetailsResponse;
import com.atyanidan.service.AbhaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Tag(name = "Form Service", description = "APIs part of the Form service")
public class AbhaController {
    private final AbhaService abhaService;

    @Autowired
    public AbhaController(AbhaService abhaService) {
        this.abhaService = abhaService;
    }

    @Operation(summary = "Get Patient Details", description = "Retrieve patient Demographic details given their ABHA ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = PatientDemographicDetailsResponse.class)) }),
            @ApiResponse(responseCode = "500", description = "Could nor retrieve details",
                    content = @Content)
    })
    @PostMapping(path= "/abha/demographics", produces = "application/json", consumes = "application/json")
    public PatientDemographicDetailsResponse getPersonDemographics(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Fieldworker to add", required = true, content = @Content(schema=@Schema(implementation = String.class)))
            @Valid @RequestBody String abhaNumber) {
        return abhaService.getPatientDemographicDetails(abhaNumber);
    }
}
