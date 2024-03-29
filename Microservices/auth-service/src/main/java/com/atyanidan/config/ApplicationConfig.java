package com.atyanidan.config;

import com.atyanidan.dao.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.client.RestTemplate;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    private final UserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByPhoneNumber(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    
}
