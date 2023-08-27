package com.app.dto;

import java.time.LocalDate;
import java.util.List;

import com.app.entities.*;

public class BookingResponse {

	private int bookingId;
	private int userId;
	private List<Services> services;
	private Amount amount;
	private Payment payment;
	private Booking_Status status;
	private LocalDate bookingDate;

	public void setBookingDate(LocalDate bookingDate) {this.bookingDate = bookingDate;}
	public void setServices(List<Services> services) {this.services = services;}
	public LocalDate getBookingDate() {return bookingDate;}
	public Booking_Status getStatus() {
		return status;
	}
	public void setStatus(Booking_Status status) {
		this.status = status;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public List<Services> getServices() {
		return services;
	}
	public void setBookingServices(List<Services> services) {
		this.services = services;
	}
	public Amount getAmount() {
		return amount;
	}
	public void setAmount(Amount amount) {
		this.amount = amount;
	}
	public Payment getPayment() {
		return payment;
	}
	public void setPayment(Payment payment) {
		this.payment = payment;
	}
	public int getBookingId() {
		return bookingId;
	}
	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}

	public Payment_Status getPaymentStatus() {
		if (payment != null) {
			return payment.getPaymentStatus();
		}
		return null;
	}

}
