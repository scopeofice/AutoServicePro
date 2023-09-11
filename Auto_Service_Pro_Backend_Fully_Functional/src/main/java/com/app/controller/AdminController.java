package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.AuthResponseDTO;
import com.app.dto.ServiceDTO;
import com.app.entities.Services;
import com.app.entities.User;
import com.app.services.ServicesService;
import com.app.services.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
	
	//Service specific functionalities
	
	@Autowired
	private ServicesService serv;

	
	@GetMapping("/service")
	public List<Services> getAllServiceDetails(){
		return serv.getAllServices();
	}
	
	@GetMapping("/service/{name}")
	public ServiceDTO getServiceByName(@PathVariable String name) {
		return serv.getServiceByName(name);
	}
	
	@PostMapping("/service")
	public ResponseEntity<?> saveNewService(@RequestBody ServiceDTO transientService){
		return new ResponseEntity<>(serv.addService(transientService),HttpStatus.CREATED);
	}
	
	@DeleteMapping("/service/{id}")
	public String deleteService(@PathVariable Integer id){
		return serv.deleteService(id);
	}
	
	@PutMapping("/service")
	public ResponseEntity<Services> updateService(@RequestBody Services detachedService){

		return new ResponseEntity<>(serv.updateServiceDetails(detachedService),HttpStatus.CREATED);
	}
	
	//User specific functionalities
	
	@Autowired
	private UserService userServ;
	
	@GetMapping("/user")
	public List<AuthResponseDTO> getAllUserDetails(){
		return userServ.getAllUser();
	}
	
	@GetMapping("/user/{email}")
	public User getUser(@PathVariable String email) {
		return userServ.getUserByEmail(email);
	}
	
	@DeleteMapping("/user/{id}")
	public String deleteUser(@PathVariable Integer id){
		return userServ.deleteUser(id);
	}
	
	@PutMapping("/user")
	public ApiResponse updateUser(@RequestBody AuthResponseDTO detachedUser){
		return new ApiResponse(userServ.updateUserDetails(detachedUser));
	}
	
	

}
