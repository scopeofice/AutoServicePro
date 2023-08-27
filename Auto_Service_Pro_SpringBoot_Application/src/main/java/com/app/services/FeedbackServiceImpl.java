package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Feedback;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.FeedbackRepository;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {


    @Autowired
    private FeedbackRepository repo;
    

    @Override
    public Feedback addFeedback(Feedback transientFeedback) {
        return repo.save(transientFeedback);
    }

    @Override
    public List<Feedback> getAllFeedback() {
        return repo.findAll();
    }

    @Override
    public String deleteFeedback(Integer id) {
        String message = "FeedbackID is invalid , can't delete Feedback details";
        if (repo.existsById(id)) {
            repo.deleteById(id);
            message = "Feedback with FeedbackId " + id + " is deleted";
        }
        return message;
    }

    @Override
    public Feedback getFeedbackById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Feedback Not Found"));
    }


    @Override
    public Feedback updateFeedbackDetails(Feedback detachedFeedback) {
        return repo.save(detachedFeedback);
    }

//    @Override
//    public List<Feedback> getUserFeedback(String email) {
//        User user = userRepo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
//
//        List<Feedback> userFeedback = new ArrayList<>();
//
//        for (Booking booking : user.getBookingList()) {
//            if (booking.getBookingServices() != null) {
//                for (BookingService bookingService : booking.getBookingServices()) {
//                    if (bookingService.getFeedback() != null) {
//                        userFeedback.add(bookingService.getFeedback());
//                    }
//                }
//            }
//        }
//
//        return userFeedback;
//    }



}
