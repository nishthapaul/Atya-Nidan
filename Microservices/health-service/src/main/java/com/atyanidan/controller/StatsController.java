package com.atyanidan.controller;

import com.atyanidan.entity.actor.FieldWorker;
import com.atyanidan.service.StatsService;
import com.atyanidan.utils.UnHealthyCountByDate;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
@Tag(name = "Health Service", description = "APIs part of the Health service")
public class StatsController {

    private final StatsService statsService;

    @Autowired
    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @Operation(summary = "Retrieve stats of healthy patients", description = "Retrieve the count of Unhealthy patients")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = UnHealthyCountByDate.class))) }),
            @ApiResponse(responseCode = "404", description = "No fieldworkers found",
                    content = @Content)
    })
    @GetMapping("/admin/{districtId}")
    public ResponseEntity<List<UnHealthyCountByDate>> getHealthCount(
            @Parameter(name = "districtId", description = "District ID", required = true)
            @PathVariable int districtId) {
        List<UnHealthyCountByDate> healthCount = statsService.getHealthCountByDate(districtId);
        return ResponseEntity.status(HttpStatus.OK).body(healthCount);
    }
}
