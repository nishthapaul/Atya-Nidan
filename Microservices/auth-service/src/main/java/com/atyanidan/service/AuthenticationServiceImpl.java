package com.atyanidan.service;

import com.atyanidan.dao.UserRepository;
import com.atyanidan.dto.AuthenticationRequest;
import com.atyanidan.dto.AuthenticationResponse;
import com.atyanidan.entity.User;
import com.atyanidan.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Optional<User> optionalEntity = userRepository.findByPhoneNumber(request.getPhoneNumber());
        if ( optionalEntity.isEmpty() ) {
            throw new NotFoundException("Invalid Phone Number: " + (request.getPhoneNumber()));
        } else {
            User user = optionalEntity.get();

            SmsMessenger smsMessenger = new SmsMessenger();
            smsMessenger.sendSms(user.getPhoneNumber(), request.getOtp());

            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }
    }
}
