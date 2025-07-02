package com.parfum.service;

import com.parfum.dto.AuthRequest;
import com.parfum.dto.AuthResponse;
import com.parfum.dto.RegisterRequest;
import com.parfum.model.User;
import com.parfum.repository.UserRepository;
import com.parfum.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Пароли не совпадают");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Пользователь с таким email уже существует");
        }

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Collections.singletonList("ROLE_USER"))
                .build();

        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user.getEmail());
        
        return new AuthResponse(
                jwtToken,
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
        );
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        
        var jwtToken = jwtService.generateToken(user.getEmail());
        
        return new AuthResponse(
                jwtToken,
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
        );
    }
} 