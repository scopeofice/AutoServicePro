package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Feedback;
import com.app.services.FeedbackService;

@RestController
@RequestMapping("/feedbacks")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {
	
	public FeedbackController() {
	System.out.println("in constructor "+getClass().getName());
	}
	
	@Autowired
	private FeedbackService serv;
	
	@PostMapping
	public ResponseEntity<?> saveNewFeedback(@RequestBody Feedback transientFeedback){
		return new ResponseEntity<>(serv.addFeedback(transientFeedback),HttpStatus.CREATED);
	}
	
	@GetMapping
	public List<Feedback> getAllFeedbackDetails(){
		return serv.getAllFeedback();
	}
	
	@GetMapping("/{id}")
	public Feedback getFeedbackById(@PathVariable Integer id) {
		return serv.getFeedbackById(id); 
	}


	
	@DeleteMapping("/{id}")
	public String deleteFeedback(@PathVariable Integer id){
		return serv.deleteFeedback(id);
	}
	
	@PutMapping
	public ResponseEntity<Feedback> updateFeedback(@RequestBody Feedback detachedFeedback){
		return new ResponseEntity<>(serv.updateFeedbackDetails(detachedFeedback),HttpStatus.CREATED);
	}

}
