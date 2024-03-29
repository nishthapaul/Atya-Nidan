package com.atyanidan.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {

    String extractUserName(String jwtToken);
    boolean isTokenValid(String token, UserDetails userDetails);

    String generateToken (UserDetails userDetails);
}
