package com.atyanidan.controller;

import com.atyanidan.dto.AuthenticationRequest;
import com.atyanidan.dto.AuthenticationResponse;
import com.atyanidan.service.AuthenticationService;
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

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authRequest) {
        System.out.println("here in authenticate");
        return ResponseEntity.ok(service.authenticate(authRequest));
    }
}
