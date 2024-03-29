package com.atyanidan.controller;

import com.atyanidan.dao.SpecialisationRepository;
import com.atyanidan.entity.Specialisation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Specialization", description = "API for handling functionalities of doctor specialization")
public class SpecialisationController {
    private final SpecialisationRepository specialisationRepository;

    @Autowired
    public SpecialisationController(SpecialisationRepository specialisationRepository) {
        this.specialisationRepository = specialisationRepository;
    }

    @Operation(summary = "Retrieve Specialisations",
            description = "Retrieve all the specialisations")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = Specialisation.class))) }),
            @ApiResponse(responseCode = "404", description = "No specializations found",
                    content = @Content)
    })
    @GetMapping("/specialisations")
    public List<Specialisation> getAllSpecialisations() {
        return specialisationRepository.findAll();
    }
}
