package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.dto.RegistrationDTO;
import com.app.services.UserService;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {
	
	@Autowired
	private UserService serv;
	
	@PostMapping
	public ResponseEntity<?> saveNewUser(@RequestBody RegistrationDTO transientUser){
		return new ResponseEntity<>(serv.addUser(transientUser),HttpStatus.CREATED);
	}
}
