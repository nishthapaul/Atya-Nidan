package com.atyanidan.controller;

import com.atyanidan.entity.actor.Admin;
import com.atyanidan.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Admin", description = "APIs for implementing functionalities of Admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @Operation(summary = "Retrieve list of admins", description = "Retrieve the list of all the admins of a given state")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {@Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = Admin.class)))}),
            @ApiResponse(responseCode = "404", description = "No fieldworkers found",
                    content = @Content)
    })
    @GetMapping("/states/{stateId}/admins")
    public List<Admin> getAdminsFromStateId(
            @Parameter(name = "stateId", description = "State ID", required = true)
            @PathVariable int stateId) {
        return adminService.getAdminsFromStateId(stateId);
    }


}
