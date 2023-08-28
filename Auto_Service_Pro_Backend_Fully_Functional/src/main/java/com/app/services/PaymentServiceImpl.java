package com.app.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.app.dto.PaymentResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Booking;
import com.app.entities.Booking_Status;
import com.app.entities.Payment;
import com.app.entities.Payment_Mode;
import com.app.entities.Payment_Status;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.BookingRepository;
import com.app.repository.PaymentRepository;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
	
	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
	private PaymentRepository repo;

	@Override
	public Payment paymentByCustomer(int bookingId,int userId,String paymentMode) {
		Booking booking=bookingRepository.findById(bookingId).orElseThrow(()->new ResourceNotFoundException("Booking Not Found"));
		
		Payment payment=repo.findByBooking(booking).orElseThrow(()->new ResourceNotFoundException("Payment Not Found"));
		payment.setPaymentMode(Payment_Mode.valueOf(paymentMode));
		payment.setPaymentDate(LocalDateTime.now());
		payment.setPaymentStatus(Payment_Status.COMPLETED);
		booking.setStatus(Booking_Status.COMPLETED);
		bookingRepository.save(booking);
		return repo.save(payment);
	}

	@Override
	public List<PaymentResponseDTO> getAllPayment() {
		List<Payment> payments = repo.findAll();
		List<PaymentResponseDTO> paymentResponseDTOs = new ArrayList<>();

		for (Payment payment : payments) {
			PaymentResponseDTO paymentResponseDTO = new PaymentResponseDTO();
			paymentResponseDTO.setPaymentId(payment.getPaymentId());
			paymentResponseDTO.setPaymentDate(payment.getPaymentDate());
			paymentResponseDTO.setAmount(payment.getAmount());
			paymentResponseDTO.setPaymentStatus(payment.getPaymentStatus());
			paymentResponseDTO.setPaymentMode(payment.getPaymentMode());

			paymentResponseDTOs.add(paymentResponseDTO);
		}

		return paymentResponseDTOs;
	}


	@Override
	public String deletePayment(Integer id) {
		String message="PaymentID is invalid , can't delete Payment details";
		if(repo.existsById(id)) {
			repo.deleteById(id);
			message="Payment with PaymentId "+id+" is deleted";
		}
		return message;
	}

	@Override
	public Payment getPaymentById(Integer id) {
		return repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Payment Not Found"));
	}
	

	@Override
	public Payment updatePaymentDetails(Payment detachedPayment) {
		return repo.save(detachedPayment);
	}

	@Override
	public Payment addPayment(Payment transientPayment) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
