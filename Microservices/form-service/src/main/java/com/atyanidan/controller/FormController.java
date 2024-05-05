package com.atyanidan.controller;

import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.mysql.Form;
import com.atyanidan.response.FormsWithFormDefinitionsResponse;
import com.atyanidan.service.FormService;
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
@RequestMapping("/api/forms")
@Tag(name = "Form Service", description = "APIs part of the Form service")
public class FormController {

    private final FormService formService;

    @Autowired
    public FormController(FormService formService) {
        this.formService = formService;
    }

    @Operation(summary = "Add a form", description = "Add a new form")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Form.class)) }),
            @ApiResponse(responseCode = "500", description = "Could not add form",
                    content = @Content)
    })
    @PostMapping(produces = "application/json", consumes = "application/json")
    public ResponseEntity<Form> addForm(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Form to add", required = true, content = @Content(schema=@Schema(implementation = FormDefinition.class)))
            @Valid @RequestBody FormDefinition formDefinition) {
        Form dbForm = formService.createForm(formDefinition);
        return ResponseEntity.status(HttpStatus.CREATED).body(dbForm);
    }

    @Operation(summary = "Set Default form", description = "Set a form as default")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Form.class)) }),
            @ApiResponse(responseCode = "500", description = "Could not update form",
                    content = @Content)
    })
    @PutMapping("/default/{formId}")
    public ResponseEntity<Form> setDefaultForm(
            @Parameter(name = "formId", description = "Form ID", required = true)
            @PathVariable int formId) {
        return ResponseEntity.ok(formService.setDefaultForm(formId));
    }

    @Operation(summary = "Retrieve list of forms", description = "Retrieve the list of all the forms")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = Form.class))) }),
            @ApiResponse(responseCode = "404", description = "No forms found",
                    content = @Content)
    })
    @GetMapping
    public List<Form> getForms() {
        return formService.getForms();
    }


    @Operation(summary = "Get Form with Form definition", description = "Retrieve the forms with from definition")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = FormsWithFormDefinitionsResponse.class)) }),
            @ApiResponse(responseCode = "500", description = "Could not retrieve form",
                    content = @Content)
    })
    @GetMapping("/form-definitions")
    public List<FormsWithFormDefinitionsResponse> getFormsWithFormDefinition() {
        return formService.getFormsWithFormDefinitions();
    }

    @Operation(summary = "Get Default form definition", description = "Retrieve the default form definition")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = FormDefinition.class)) }),
            @ApiResponse(responseCode = "500", description = "Could not retrieve form",
                    content = @Content)
    })
    @GetMapping("/default")
    public FormDefinition getDefaultForm() {
        return formService.getSelectedForm();
    }
}
