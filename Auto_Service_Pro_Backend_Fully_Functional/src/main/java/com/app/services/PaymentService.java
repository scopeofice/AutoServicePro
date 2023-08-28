package com.app.services;

import java.util.List;

import com.app.dto.PaymentResponseDTO;
import com.app.entities.Payment;

public interface PaymentService {

	Payment addPayment(Payment transientPayment);
	List<PaymentResponseDTO> getAllPayment();
	String deletePayment(Integer id);
	Payment getPaymentById(Integer id);
	Payment updatePaymentDetails(Payment detachedPayment);
	Payment paymentByCustomer(int bookingId, int userId, String paymentMode);
}
