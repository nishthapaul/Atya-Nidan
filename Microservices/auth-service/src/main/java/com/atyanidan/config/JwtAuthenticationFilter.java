package com.atyanidan.config;

import com.atyanidan.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader= request.getHeader("Authorization");
//      we need to pass jwt token in header, "Authorization" contains the jwt token or bearer token
        final String jwtToken;
        final String userPhoneNumber;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            // don't continue
            return;
        }
        jwtToken = authHeader.substring(7);
        userPhoneNumber = jwtService.extractUserName(jwtToken);
        if (userPhoneNumber != null && SecurityContextHolder.getContext().getAuthentication() == null ) {
            // user is not connected
            // check if the user is in the database
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userPhoneNumber);
            if (jwtService.isTokenValid(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                // This authtoken is need by the spring and security context folder to update our security
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

        }
        filterChain.doFilter(request, response);
    }
}
