package com.app.controller;

import java.util.List;

import com.app.dto.PaymentResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.entities.Payment;
import com.app.services.PaymentService;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:3001")
public class PaymentController {
	
	public PaymentController() {
		System.out.println("in constructor "+getClass().getName());
		}
		
		@Autowired
		private PaymentService serv;
		
		@PostMapping("/addPayment")
		public ResponseEntity<?> saveNewPayment(@RequestBody Payment transientPayment){
			return new ResponseEntity<>(serv.addPayment(transientPayment),HttpStatus.CREATED);
		}
		
		@GetMapping
		public List<PaymentResponseDTO> getAllPaymentDetails(){
			return serv.getAllPayment();
		}
		
		@GetMapping("/{id}")
		public Payment getPaymentById(@PathVariable Integer id) {
			return serv.getPaymentById(id); 
		}

		
		@DeleteMapping("/{id}")
		public String deletePayment(@PathVariable Integer id){
			return serv.deletePayment(id);
		}
		
		@PutMapping
		public ResponseEntity<Payment> updatePayment(@RequestBody Payment detachedPayment){
			return new ResponseEntity<>(serv.updatePaymentDetails(detachedPayment),HttpStatus.CREATED);
		}
		
		@PostMapping("/payment")
		public ResponseEntity<?> saveNewPayment(@RequestParam("bookingId") int bookingId,@RequestParam("userId") int userId,@RequestParam("paymentMode") String paymentMode){
			return new ResponseEntity<>(serv.paymentByCustomer(bookingId, userId, paymentMode),HttpStatus.CREATED);
		}


}
