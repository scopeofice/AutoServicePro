package com.app.controller;

import com.app.dto.ApiResponse;
import com.app.dto.AuthResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.ServiceDTO;
import com.app.services.ServicesService;
import com.app.services.UserService;



@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3001")
public class UserController {
	
	public UserController() {
	System.out.println("in constructor "+getClass().getName());
	}
	
	@Autowired
	private UserService userServ;
	@PutMapping
	public ApiResponse updateUser(@RequestBody AuthResponseDTO detachedUser){
		return new ApiResponse(userServ.updateUserDetails(detachedUser));
	}
	
	@Autowired
	private ServicesService serv;
	
//	@PostMapping("/addUser")
//	public ResponseEntity<?> saveNewUser(@RequestBody User transientUser){
//		return new ResponseEntity<>(serv.addUser(transientUser),HttpStatus.CREATED);
//	}
	
//	@RequestMapping
//	public List<User> getAllUserDetails(){
//		return serv.getAllUser();
//	}
//	
//	@RequestMapping("/id/{id}")
//	public User getUserById(@PathVariable Integer id) {
//		return serv.getUserById(id); 
//	}
	
//	@DeleteMapping("{id}")
//	public String deleteUser(@PathVariable Integer id){
//		return serv.deleteUser(id);
//	}
	
	
	@GetMapping("/service/{name}")
	public ServiceDTO getServiceByName(@PathVariable String name) {
		return serv.getServiceByName(name);
	}
	
//	@PutMapping
//	public ResponseEntity<User> updateUser(@RequestBody User detachedUser){
//		return new ResponseEntity<>(userServ.updateUserDetails(detachedUser),HttpStatus.CREATED);
//	}

}
