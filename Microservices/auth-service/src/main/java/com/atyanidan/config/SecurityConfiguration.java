package com.atyanidan.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.atyanidan.util.ApiConstants.*;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(configurer -> configurer
                    .requestMatchers("/atyanidan/auth/api/**")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/atyanidan/auth-service/doctor/demo").hasAuthority("Doctor")
                    .requestMatchers(HttpMethod.GET, "/atyanidan/auth-service/fw/demo").hasAuthority("FieldWorker")
                    .requestMatchers(HttpMethod.GET, DOCTORS_BY_DISTRICTS_API).hasAuthority("Admin")
                    .requestMatchers(HttpMethod.GET, FIELDWORKERS_BY_DISTRICTS_API).hasAuthority("Admin")
                    .requestMatchers(HttpMethod.GET, ADMINS_BY_STATES_API).hasAuthority("SuperAdmin")
                        .anyRequest() // all the other requests must be authenticated
                        .authenticated()
            )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // will create a new session for each request
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        System.out.println(DOCTORS_BY_DISTRICTS_API);
        return http.build();
    }
}
