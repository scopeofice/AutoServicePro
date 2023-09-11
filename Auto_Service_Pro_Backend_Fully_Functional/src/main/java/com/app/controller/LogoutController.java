package com.app.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
public class LogoutController {

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        // Log the user out by clearing the security context
        SecurityContextHolder.clearContext();

        // Invalidate the session if it exists
        request.getSession().invalidate();
        
        // Optionally, you can clear any authentication cookies
        // response.addCookie(new Cookie("JSESSIONID", null)); // Example for JSESSIONID cookie

        // Set an appropriate response status (e.g., 204 No Content)
        response.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }
}

