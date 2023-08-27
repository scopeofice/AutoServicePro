package com.app.controller;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.dto.AuthRequestDTO;
import com.app.services.UserService;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3001")
public class LoginController {
	
	@Autowired
	private UserService serv;
	
	@PostMapping
	public ResponseEntity<?> authenticateEmp(@RequestBody @Valid AuthRequestDTO request, HttpSession session, HttpServletResponse response) {
		System.out.println(request.getEmail()+" "+request.getPassword());
		return ResponseEntity.status(HttpStatus.OK)
				.body(serv.authenticateUser(request,session,response));
	
	}
	

}
