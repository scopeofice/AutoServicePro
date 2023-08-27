package com.app.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Booking;
import com.app.entities.BookingService;

@Repository
public interface BookingServiceRepository extends JpaRepository<BookingService, Long> {

    // You can add custom query methods here if needed

	List<BookingService> findByBooking(Booking booking);
}

