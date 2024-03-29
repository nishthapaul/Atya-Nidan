package com.atyanidan.service;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface JwtService {

    String extractUserName(String jwtToken);
    boolean isTokenValid(String token, UserDetails userDetails);

    String generateToken (UserDetails userDetails);

    String generateToken (Map<String, Object> extraClaims, UserDetails userDetails);
}
