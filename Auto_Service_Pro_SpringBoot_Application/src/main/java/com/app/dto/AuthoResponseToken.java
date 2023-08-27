package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthoResponseToken {
    private String jwt;

    public AuthoResponseToken(String token) {
        this.jwt=token;
    }
}
