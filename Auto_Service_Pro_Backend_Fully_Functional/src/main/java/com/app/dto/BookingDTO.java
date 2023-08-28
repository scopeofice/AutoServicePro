package com.app.dto;

import java.util.List;

import com.app.entities.Services;

public class BookingDTO {
	private int bookingId;
	private Integer userId;
	private List<Services> services;
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public List<Services> getServices() {
		return services;
	}
	public void setServices(List<Services> services) {
		this.services = services;
	}
	public int getBookingId() {
		return bookingId;
	}
	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}

}
