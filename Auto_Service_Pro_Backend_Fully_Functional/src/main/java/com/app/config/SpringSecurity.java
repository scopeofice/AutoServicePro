package com.app.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SpringSecurity {

    @Bean
    public BCryptPasswordEncoder  passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain myAuthorization(HttpSecurity http) throws Exception {
        return http.csrf(csrf -> csrf.disable()).authorizeRequests(auth -> {
            auth.antMatchers("/swagger*/*", "/v/api-docs/**", "/user/all").permitAll();
            auth.antMatchers("/User/**").permitAll();
					auth.antMatchers("/customer/**").hasRole("CUSTOMER");
					auth.antMatchers("/admin").hasRole("ADMIN");
					auth.antMatchers("/employee").hasRole("EMPLOYEE");
        }).httpBasic(Customizer.withDefaults()).build();
    }


}
