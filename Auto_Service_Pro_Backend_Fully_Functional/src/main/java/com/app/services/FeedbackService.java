package com.app.services;

import java.util.List;

import com.app.entities.Feedback;

public interface FeedbackService {
	Feedback addFeedback(Feedback transientFeedback);
	List<Feedback> getAllFeedback();
	String deleteFeedback(Integer id);
	Feedback getFeedbackById(Integer id);
	Feedback updateFeedbackDetails(Feedback detachedFeedback);

//	List<Feedback> getUserFeedback(String email);

}
