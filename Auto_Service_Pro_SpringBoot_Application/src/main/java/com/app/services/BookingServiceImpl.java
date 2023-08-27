package com.app.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.BookingDTO;
import com.app.dto.BookingResponse;
import com.app.dto.UpdateBookingDto;
import com.app.entities.Amount;
import com.app.entities.Booking;
import com.app.entities.BookingService;
import com.app.entities.Booking_Status;
import com.app.entities.Payment;
import com.app.entities.Payment_Mode;
import com.app.entities.Payment_Status;
import com.app.entities.Services;
import com.app.entities.User;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.BookingRepository;
import com.app.repository.BookingServiceRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class BookingServiceImpl implements BookingServices  {
	

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private BookingRepository bookingRepo;
	
	@Autowired
	private BookingServiceRepository bookingServiceRepo;


	

	@Override
	public BookingResponse addBooking(BookingDTO transientBooking) {
		Booking booking=new Booking();
		List<BookingService> bookingServices=new ArrayList<>();
		User user=userRepo.findById(transientBooking.getUserId()).orElseThrow(()-> new ResourceNotFoundException("User Not Found")); 
		booking.setAssignedUser(user);
		booking.setBookingDate(LocalDate.now());
		booking.setStatus(Booking_Status.PENDING);
		//bookingRepo.save(booking);
		transientBooking.getServices().forEach(e->{BookingService bs=new BookingService();bs.setServices(e);bs.setBooking(booking);bookingServices.add(bs);});
		double serviceCost=bookingServices.stream().map(e->e.getServices().getPrice()).reduce(0.0,(element1, element2) -> element1 + element2);
		double gst=serviceCost/100*12;
		Amount amount=new Amount();
		amount.setBooking(booking);
		amount.setAmount(serviceCost);
		amount.setGst(gst);
		amount.setFinalAmount(gst+serviceCost);
		Payment payment=new Payment();
		payment.setAmount(gst+serviceCost);
		payment.setPaymentDate(LocalDateTime.now());
		payment.setPaymentMode(Payment_Mode.UPI);
		payment.setPaymentStatus(Payment_Status.PENDING);
		payment.setBooking(booking);
		booking.setBookingServices(bookingServices);
		booking.setAmount(amount);
		booking.setPayment(payment);
		bookingRepo.save(booking);
		BookingResponse bookingResponse=new BookingResponse();
		addPaymentToBookingResponse(booking.getPayment(), bookingResponse);
		addAmountToBookingResponse(booking.getAmount(), bookingResponse);
		addServicesToBookingResponse(booking.getBookingServices(), bookingResponse);
		bookingResponse.setBookingId(booking.getBookingId());
		bookingResponse.setUserId(user.getUserId()); 
		bookingResponse.setStatus(booking.getStatus());
		return bookingResponse;
	}

	@Override
	public List<BookingResponse> getAllBooking() {
		List<BookingResponse> list=new LinkedList<BookingResponse>();
		List<Booking> bookings=bookingRepo.findAll();
		bookings.stream().forEach(booking->{BookingResponse bookingResponse=new BookingResponse();
		List<BookingService> bookingServices=bookingServiceRepo.findByBooking(booking);
		addPaymentToBookingResponse(booking.getPayment(), bookingResponse);
		addAmountToBookingResponse(booking.getAmount(), bookingResponse);
		addServicesToBookingResponse(bookingServices, bookingResponse);
		bookingResponse.setBookingId(booking.getBookingId());
		bookingResponse.setStatus(booking.getStatus());
		bookingResponse.setUserId(booking.getAssignedUser().getUserId()); list.add(bookingResponse);});
		
		return list;
	}

	@Override
	public String deleteBooking(Integer id) {
		String message="BookingID is invalid , can't delete Booking details";
		if(bookingRepo.existsById(id)) {
			bookingRepo.deleteById(id);
			message="Booking with BookingId "+id+" is deleted";
		}
		return message;
	}

	@Override
	public BookingResponse getBookingById(Integer id) {
		Booking booking=bookingRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Booking Not Found"));
		BookingResponse bookingResponse=new BookingResponse();
		List<BookingService> bookingServices=bookingServiceRepo.findByBooking(booking);
		addPaymentToBookingResponse(booking.getPayment(), bookingResponse);
		addAmountToBookingResponse(booking.getAmount(), bookingResponse);
		addServicesToBookingResponse(bookingServices, bookingResponse);
		bookingResponse.setBookingId(booking.getBookingId());
		bookingResponse.setUserId(booking.getAssignedUser().getUserId());
		bookingResponse.setStatus(booking.getStatus());
		return bookingResponse;
	}


	@Override
	public Booking updateBookingDetails(UpdateBookingDto detachedBooking) {
		Booking booking = bookingRepo.findById(detachedBooking.getBookingId())
				.orElseThrow(() -> new ResourceNotFoundException("Booking Not Found"));
		booking.setStatus(detachedBooking.getStatus());
		booking.setBookingDate(detachedBooking.getBookingDate());
		return bookingRepo.save(booking);
	}


	@Override
	public List<BookingResponse> getBookingsByUserEmail(String email) {
		List<BookingResponse> bookingResponses = new ArrayList<>();
		User customer=userRepo.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("User Not Found"));

		List<Booking> bookings = customer.getBookingList();

		for (Booking booking : bookings) {
			BookingResponse bookingResponse = new BookingResponse();
			List<BookingService> bookingServices = bookingServiceRepo.findByBooking(booking);

			addPaymentToBookingResponse(booking.getPayment(), bookingResponse);
			addAmountToBookingResponse(booking.getAmount(), bookingResponse);
			addServicesToBookingResponse(bookingServices, bookingResponse);

			bookingResponse.setBookingId(booking.getBookingId());
			bookingResponse.setUserId(booking.getAssignedUser().getUserId());
			bookingResponse.setStatus(booking.getStatus());
			bookingResponse.setBookingDate(booking.getBookingDate());
			bookingResponses.add(bookingResponse);
		}

		return bookingResponses;
	}


	private void addPaymentToBookingResponse(Payment payment,BookingResponse bookingResponse) {
		Payment payment1=new Payment();
		payment1.setPaymentDate(payment.getPaymentDate());
		payment1.setAmount(payment.getAmount());
		payment1.setPaymentId(payment.getPaymentId());
		payment1.setPaymentStatus(payment.getPaymentStatus());
		payment1.setPaymentMode(payment.getPaymentMode());
		bookingResponse.setPayment(payment1);
	}
	private void addAmountToBookingResponse(Amount amount,BookingResponse bookingResponse) {
		Amount amount1=new Amount();
		amount1.setAmount(amount.getAmount());
		amount1.setFinalAmount(amount.getFinalAmount());
		amount1.setGst(amount.getGst());
		bookingResponse.setAmount(amount1);
	}
	private void addServicesToBookingResponse(List<BookingService> bookingServices,BookingResponse bookingResponse) {
		List<Services> services=new ArrayList<Services>();
		bookingServices.stream().forEach(e->services.add(e.getServices()));
		bookingResponse.setBookingServices(services);
	}
	
	


}
