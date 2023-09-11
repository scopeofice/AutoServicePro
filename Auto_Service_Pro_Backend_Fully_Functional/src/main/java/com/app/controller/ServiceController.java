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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ServiceDTO;
import com.app.entities.Services;
import com.app.services.ServicesService;

@RestController
@RequestMapping("/service")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {
	
	public ServiceController() {
		System.out.println("in constructor "+getClass().getName());
		}
		
		@Autowired
		private ServicesService serv;
		
		@PostMapping
		public ResponseEntity<?> saveNewService(@RequestBody ServiceDTO transientService){
			return new ResponseEntity<>(serv.addService(transientService),HttpStatus.CREATED);
		}
		
		@GetMapping
		public List<Services> getAllServiceDetails(){
			return serv.getAllServices();
		}
		
		@GetMapping("/id/{id}")
		public ServiceDTO getServiceById(@PathVariable Integer id) {
			return serv.getServiceById(id); 
		}
		
		@DeleteMapping("{id}")
		public String deleteService(@PathVariable Integer id){
			return serv.deleteService(id);
		}
		
//		@PutMapping
//		public ResponseEntity<Services> updateService(@RequestBody ServiceDTO detachedService){
//			return new ResponseEntity<>(serv.updateServiceDetails(detachedService),HttpStatus.CREATED);
//		}


}
