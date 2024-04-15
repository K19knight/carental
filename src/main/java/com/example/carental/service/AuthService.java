package com.example.carental.service;

import com.example.carental.auth.AuthenticationRequest;
import com.example.carental.auth.AuthenticationResponse;
import com.example.carental.auth.RegisterRequest;
import com.example.carental.config.CustomJwtService;
import com.example.carental.config.CustomUserDetails;
import com.example.carental.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;
    @Autowired
    private CustomJwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        User user = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .surname(request.getSurname())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userService.saveUser(user);
        CustomUserDetails userDetails = new CustomUserDetails();
        userDetails.setUser(user);
        String token = jwtService.generateToken(userDetails);
        return AuthenticationResponse.builder().token(token).build();
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),request.getPassword()
                )
        );
        User user = userService.getUserByEmail(request.getEmail());
        CustomUserDetails userDetails = new CustomUserDetails();
        userDetails.setUser(user);
        String token = jwtService.generateToken(userDetails);
        return AuthenticationResponse.builder().token(token).build();
    }
}
