package com.atyanidan.controller;

import com.atyanidan.entity.Taluka;
import com.atyanidan.service.TalukaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Taluka", description = "API for handling functionalities of talukas")
public class TalukaController {
    private final TalukaService talukaService;

    @Autowired
    public TalukaController(TalukaService talukaService) {
        this.talukaService = talukaService;
    }

    @Operation(summary = "Get talukas", description = "Retrieve all the talukas of a given district")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = Taluka.class))) }),
            @ApiResponse(responseCode = "404", description = "Taluka not found",
                    content = @Content)
    })
    @GetMapping("/districts/{districtId}/talukas")
    public List<Taluka> getTalukasFromDistrictId(@Parameter(
            name = "districtId",
            description = "District ID",
            required = true) @PathVariable int districtId) {
        return talukaService.getTalukasFromDistrictId(districtId);
    }
}
