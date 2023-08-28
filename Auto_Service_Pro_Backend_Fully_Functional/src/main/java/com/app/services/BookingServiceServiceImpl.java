package com.app.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.BookingService;
import com.app.repository.BookingServiceRepository;

@Service
@Transactional
public class BookingServiceServiceImpl implements BookingServiceService {

    private final BookingServiceRepository bookingServiceRepository;

    public BookingServiceServiceImpl(BookingServiceRepository bookingServiceRepository) {
        this.bookingServiceRepository = bookingServiceRepository;
    }

    @Override
    public List<BookingService> getAllBookingService() {
        return bookingServiceRepository.findAll();
    }

    @Override
    public BookingService addBookingService(BookingService trBookingService) {
        return bookingServiceRepository.save(trBookingService);
    }

    @Override
    public String deleteBookingService(Long BookingServiceId) {
        bookingServiceRepository.deleteById(BookingServiceId);
        return "BookingService with ID " + BookingServiceId + " has been deleted.";
    }

    @Override
    public BookingService updateBookingService(BookingService detacherBookingService) {
        return bookingServiceRepository.save(detacherBookingService);
    }

    @Override
    public BookingService getBookingServiceById(Long id) {
        return bookingServiceRepository.findById(id).orElse(null);
    }
}
