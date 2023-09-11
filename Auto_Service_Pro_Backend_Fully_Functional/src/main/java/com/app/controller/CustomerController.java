package com.app.controller;

import com.app.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.entities.Feedback;
import com.app.services.BookingServices;
import com.app.services.FeedbackService;
import com.app.services.ServicesService;
import com.app.services.UserService;
import java.util.List;

@RestController
@RequestMapping("/cutomers")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

	@Autowired
	private ServicesService serv;

	// service related functionality

//	@GetMapping("/service")
//	public List<Service> getAllServiceDetails() {
//		return serv.getAllService();
//	}

	@GetMapping("/service/{name}")
	public ServiceDTO getServiceByName(@PathVariable String name) {
		return serv.getServiceByName(name);
	}

	// booking related functionality
	
	@Autowired
	private BookingServices bookservice;
	
	@PostMapping("/booking")
	public ResponseEntity<?> saveNewBooking(@RequestBody BookingDTO transientBooking){
		return new ResponseEntity<>(bookservice.addBooking(transientBooking),HttpStatus.CREATED);
	}

	@GetMapping("/{email}")
	public List<BookingResponse> getUserBookings(@PathVariable String email){
		return bookservice.getBookingsByUserEmail(email);
	}
	@DeleteMapping("{id}")
	public String deleteBooking(@PathVariable Integer id){
		return bookservice.deleteBooking(id);
	}
//	@Autowired
//	private BookingServiceService bookserv;
//
//	@PostMapping
//	public BookingService addBookingService(@RequestBody BookingService newBookingService) {
//		return bookserv.addBookingService(newBookingService);
//	}
//
//	@DeleteMapping("/{bookingServiceId}")
//	public String deleteBookingService(@PathVariable Long bookingServiceId) {
//		return bookserv.deleteBookingService(bookingServiceId);
//
//	}
	//customer related functionality
	@Autowired
	private UserService userServ;
	
	@PutMapping
	public ApiResponse updateUser(@RequestBody AuthResponseDTO detachedUser){
		return new ApiResponse(userServ.updateUserDetails(detachedUser));
	}
	
	@Autowired
	private FeedbackService feedbackService;
	//feedback related functionality
	@PostMapping("/addFeedback")
	public ResponseEntity<?> saveNewFeedback(@RequestBody Feedback transientFeedback){
		return new ResponseEntity<>(feedbackService.addFeedback(transientFeedback),HttpStatus.CREATED);
	}
	
	@DeleteMapping("/feedback/{id}")
	public String deleteFeedback(@PathVariable Integer id){
		return feedbackService.deleteFeedback(id);
	}
	
	@PutMapping("/feedback/update")
	public ResponseEntity<Feedback> updateFeedback(@RequestBody Feedback detachedFeedback){
		return new ResponseEntity<>(feedbackService.updateFeedbackDetails(detachedFeedback),HttpStatus.CREATED);
	}
}
