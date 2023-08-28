package com.app.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.BookingService;
import com.app.services.BookingServiceService;




@RestController
@RequestMapping("/employees")
public class EmployeeController {
	
	@Autowired
	private BookingServiceService serv;
	
	 @PutMapping
	 public BookingService updateBookingInfo(@RequestBody BookingService detachedBooking) {
		 
		 return serv.updateBookingService(detachedBooking);
		 
	 }

	
	
	
	

}
