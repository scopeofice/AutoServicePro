package com.app.services;

import java.util.List;

import com.app.dto.BookingDTO;
import com.app.dto.BookingResponse;
import com.app.dto.UpdateBookingDto;
import com.app.entities.Booking;

public interface BookingServices {

	BookingResponse addBooking(BookingDTO transientBooking);
	List<BookingResponse> getAllBooking();
	String deleteBooking(Integer id);
	BookingResponse getBookingById(Integer id);
	Booking updateBookingDetails(UpdateBookingDto detachedBooking);

	List<BookingResponse> getBookingsByUserEmail(String email);

}
