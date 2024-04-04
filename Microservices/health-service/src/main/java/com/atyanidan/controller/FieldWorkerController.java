package com.atyanidan.controller;

import com.atyanidan.entity.actor.FieldWorker;
import com.atyanidan.model.requestbody.FieldWorkerAvailabilityRequest;
import com.atyanidan.service.FieldWorkerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Field Worker", description = "APIs for implementing functionalities of Field workers")
public class FieldWorkerController {
    private final FieldWorkerService fieldWorkerService;

    @Autowired
    public FieldWorkerController(FieldWorkerService fieldWorkerService) {
        this.fieldWorkerService = fieldWorkerService;
    }

    @Operation(summary = "Retrieve list of fieldworkers", description = "Retrieve the list of all the fieldworkers of a given taluka")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = FieldWorker.class))) }),
            @ApiResponse(responseCode = "404", description = "No fieldworkers found",
                    content = @Content)
    })
    @GetMapping("/talukas/{talukaId}/fieldworkers")
    public List<FieldWorker> getFieldWorkersFromTalukaId(
            @Parameter(name = "talukaId", description = "Taluka ID", required = true)
            @PathVariable int talukaId,
            @Parameter(name = "available", description = "Availability status of fieldworker")
            @RequestParam(required = false) Boolean available) {
        if ( available != null )
            return fieldWorkerService.getFieldWorkersByTalukaIdAndAvailable(talukaId, available);
        else
            return fieldWorkerService.getFieldWorkersByTalukaId(talukaId);
    }

    @Operation(summary = "Retrieve list of fieldworkers", description = "Retrieve the list of all the fieldworkers of a given district")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = FieldWorker.class))) }),
            @ApiResponse(responseCode = "404", description = "No fieldworkers found",
                    content = @Content)
    })
    @GetMapping("/districts/{districtId}/fieldworkers")
    public List<FieldWorker> getFieldWorkersFromDistrictId(
            @Parameter(name = "districtId", description = "District ID", required = true)
            @PathVariable int districtId) {
        return fieldWorkerService.getFieldWorkersFromDistrictIdV2(districtId);
    }

    @Operation(summary = "Add a fieldworker", description = "Add a fieldworker in a given taluka")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = FieldWorker.class)) }),
            @ApiResponse(responseCode = "500", description = "Could not add field worker",
                    content = @Content)
    })
    @PostMapping(path = "/talukas/{talukaId}/fieldworkers", produces = "application/json", consumes = "application/json")
    public ResponseEntity<FieldWorker> addFieldWorker(
            @Parameter(name = "talukaId", description = "Taluka ID", required = true)
            @PathVariable int talukaId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Fieldworker to add", required = true, content = @Content(schema=@Schema(implementation = FieldWorker.class)))
            @Valid @RequestBody FieldWorker fieldWorker) throws Exception {
        FieldWorker dbFieldWorker = fieldWorkerService.addFieldWorker(talukaId, fieldWorker);
        return ResponseEntity.status(HttpStatus.CREATED).body(dbFieldWorker);
    }

    @Operation(summary = "Update Availability of Fieldworker", description = "Update the availability status of a fieldworker and assign a substitute")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = FieldWorker.class)) }),
            @ApiResponse(responseCode = "500", description = "Could not update field worker availability",
                    content = @Content)
    })
    @PutMapping(path = "/fieldworkers/{fieldWorkerId}", produces = "application/json", consumes = "application/json")
    public ResponseEntity<FieldWorker> updateFieldWorkerAvailability(
            @Parameter(name = "fieldWorkerId", description = "Fieldworker ID", required = true)@PathVariable int fieldWorkerId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Fieldworker availability status and substitute", required = true, content = @Content(schema=@Schema(implementation = FieldWorkerAvailabilityRequest.class)))
            @Valid @RequestBody FieldWorkerAvailabilityRequest requestBody) {
        FieldWorker dbFieldWorker = fieldWorkerService.updateAvailability(fieldWorkerId, requestBody);
        return ResponseEntity.status(HttpStatus.OK).body(dbFieldWorker);
    }

}
