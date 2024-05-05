package com.atyanidan.controller;

import com.atyanidan.dto.AuthenticationRequest;
import com.atyanidan.dto.AuthenticationResponse;
import com.atyanidan.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/atyanidan/auth/api")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @Operation(summary = "Authenticate a user", description = "Add a form definition")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = AuthenticationResponse.class)) }),
            @ApiResponse(responseCode = "500", description = "Could not add form definition",
                    content = @Content)
    })
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Fieldworker to add", required = true, content = @Content(schema=@Schema(implementation = AuthenticationRequest.class)))
            @RequestBody AuthenticationRequest authRequest) {
        System.out.println("here in authenticate");
        return ResponseEntity.ok(service.authenticate(authRequest));
    }
}
