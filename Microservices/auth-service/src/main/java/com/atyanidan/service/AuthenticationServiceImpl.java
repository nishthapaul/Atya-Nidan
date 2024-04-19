package com.atyanidan.service;

import com.atyanidan.dao.UserRepository;
import com.atyanidan.dto.AuthenticationRequest;
import com.atyanidan.dto.AuthenticationResponse;
import com.atyanidan.dto.AuthenticationType;
import com.atyanidan.entity.actor.User;
import com.atyanidan.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final SmsMessenger smsMessenger;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Optional<User> optionalEntity;
        if(request.getType() == AuthenticationType.PHONE_NUMBER){
            optionalEntity = userRepository.findByPhoneNumber(request.getUserCredential());
        }
        else{
            optionalEntity = userRepository.findByEmail(request.getUserCredential());
        }

        if ( optionalEntity.isEmpty() ) {
            throw new NotFoundException("Invalid Email or Phone Number: " + (request.getUserCredential()));
        } else {
            User user = optionalEntity.get();

            System.out.println("user " + user);

            smsMessenger.sendSms(user.getPhoneNumber(), request.getOtp());

            String userRole = user.getRole().toString();

            var jwtToken = jwtService.generateToken(Map.of("role", userRole), user);
            System.out.println("token: " + jwtToken);

            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .user(user)
                    .build();
        }
    }
}
