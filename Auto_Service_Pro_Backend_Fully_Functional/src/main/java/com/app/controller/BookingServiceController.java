package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.entities.BookingService;
import com.app.services.BookingServiceService;

@RestController
@RequestMapping("/bookingService")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingServiceController {

    private final BookingServiceService bookingServiceService;

    @Autowired
    public BookingServiceController(BookingServiceService bookingServiceService) {
        this.bookingServiceService = bookingServiceService;
    }

    @GetMapping
    public List<BookingService> getAllBookingServices() {
        return bookingServiceService.getAllBookingService();
    }

    @PostMapping
    public BookingService addBookingService(@RequestBody BookingService newBookingService) {
        return bookingServiceService.addBookingService(newBookingService);
    }

    @DeleteMapping("/{bookingServiceId}")
    public String deleteBookingService(@PathVariable Long bookingServiceId) {
        return bookingServiceService.deleteBookingService(bookingServiceId);
    }

    @PutMapping
    public BookingService updateBookingService(@RequestBody BookingService updatedBookingService) {
        return bookingServiceService.updateBookingService(updatedBookingService);
    }

    @GetMapping("/{id}")
    public BookingService getBookingServiceById(@PathVariable Long id) {
        return bookingServiceService.getBookingServiceById(id);
    }
}

