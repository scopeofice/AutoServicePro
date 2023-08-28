package com.app.services;

import java.util.List;

import com.app.entities.BookingService;

public interface BookingServiceService {
    List<BookingService> getAllBookingService();
    BookingService addBookingService(BookingService trBookingService);
    String deleteBookingService(Long BookingServiceId);
    BookingService updateBookingService(BookingService detacherBookingService);
    BookingService getBookingServiceById(Long id);
}

