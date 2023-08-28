package com.app.controller;

import java.util.List;

import com.app.dto.UpdateBookingDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.dto.BookingDTO;
import com.app.dto.BookingResponse;
import com.app.entities.Booking;
import com.app.services.BookingServices;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:3001")
public class BookingController {

	@Autowired
	private BookingServices serv;

	@PostMapping("/addBooking")
	public ResponseEntity<BookingResponse> saveNewBooking(@RequestBody BookingDTO transientBooking) {
		BookingResponse booking = serv.addBooking(transientBooking);
		return new ResponseEntity<>(booking, HttpStatus.CREATED);
	}

	@GetMapping
	public List<BookingResponse> getAllBookingDetails() {
		return serv.getAllBooking();
	}

	@GetMapping("/{id}")
	public BookingResponse getBookingById(@PathVariable Integer id) {
		return serv.getBookingById(id);
	}

//	@DeleteMapping("{id}")
//	public String deleteBooking(@PathVariable Integer id) {
//		return serv.deleteBooking(id);
//	}

	@PutMapping
	public ResponseEntity<Booking> updateBooking(@RequestBody UpdateBookingDto detachedBooking) {
		System.out.println(detachedBooking.toString());
		return new ResponseEntity<>(serv.updateBookingDetails(detachedBooking), HttpStatus.CREATED);
	}

}
