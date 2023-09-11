package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.AuthResponseDTO;
import com.app.dto.ServiceDTO;
import com.app.entities.User;
import com.app.services.ServicesService;
import com.app.services.UserService;



@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
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
	@GetMapping("/{email}")
	public User getUserDetailsByEmail(@PathVariable String email) {
		return userServ.getUserByEmail(email);
	}
	
	@PostMapping("/send-otp")
    public String sendOTPByEmail(@RequestParam String email) {
        try {
        	userServ.sendOTPToUserEmail(email);
            return "OTP sent successfully to " + email;
        } catch (Exception e) {
            return "Failed to send OTP: " + e.getMessage();
        }
    }
	@PostMapping("/reset-password")
    public String resetPassword(@RequestParam String email, @RequestParam String otp, @RequestParam String newPassword) {
        try {
            // Verify OTP and reset password
            String result = userServ.resetPasswordWithOTP(email, otp, newPassword);
            return result;
        } catch (Exception e) {
            // Handle exceptions here, e.g., invalid OTP or user not found
            return "Failed to reset password: " + e.getMessage();
        }
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
