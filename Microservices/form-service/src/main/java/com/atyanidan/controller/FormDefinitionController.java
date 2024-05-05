package com.atyanidan.controller;

import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.service.FormDefinitionService;
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
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/form-definitions")
@Tag(name = "Form Service", description = "APIs part of the Form service")
public class FormDefinitionController {
    private final FormDefinitionService formDefinitionService;

    @Autowired
    public FormDefinitionController(FormDefinitionService formDefinitionService) {
        this.formDefinitionService = formDefinitionService;
    }

    @Operation(summary = "Retrieve list of Form Definitions", description = "Retrieve the list of all the form definition")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = FormDefinition.class))) }),
            @ApiResponse(responseCode = "404", description = "No form definitions found",
                    content = @Content)
    })
    @GetMapping
    public Iterable<FormDefinition> getFormDefinitions() {
        return formDefinitionService.getFormDefinitions();
    }


    @Operation(summary = "Retrieve user", description = "Retrieve a user given the user's employee ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = FormDefinition.class)) }),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content)
    })
    @GetMapping("/{formDefinitionId}")
    public FormDefinition getFormDefinition(
            @Parameter(name = "formDefinitionId", description = "Form Definition ID", required = true)
            @PathVariable String formDefinitionId) {
        return formDefinitionService.getFormDefinition(formDefinitionId);
    }

    @Operation(summary = "Add a form Definition", description = "Add a form definition")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = FormDefinition.class)) }),
            @ApiResponse(responseCode = "500", description = "Could not add form definition",
                    content = @Content)
    })
    @PostMapping(produces = "application/json", consumes = "application/json")
    public FormDefinition addFormDefinition(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Fieldworker to add", required = true, content = @Content(schema=@Schema(implementation = FormDefinition.class)))
            @Valid @RequestBody FormDefinition formDefinition) {
        return formDefinitionService.insertFormDefinition(formDefinition);
    }
}
