package com.atyanidan.service;

import com.atyanidan.dto.AuthenticationRequest;
import com.atyanidan.dto.AuthenticationResponse;

public interface AuthenticationService {

    AuthenticationResponse authenticate(AuthenticationRequest request);
}
