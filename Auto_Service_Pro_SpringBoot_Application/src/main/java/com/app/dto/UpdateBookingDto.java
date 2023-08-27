package com.app.dto;

import java.time.LocalDate;

import com.app.entities.Booking_Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateBookingDto {
    private int bookingId;
    private Booking_Status status;
    private LocalDate bookingDate;
}
