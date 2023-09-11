package com.app.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.AuthRequestDTO;
import com.app.dto.AuthResponseDTO;
import com.app.dto.RegistrationDTO;
import com.app.entities.Booking;
import com.app.entities.User;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.UserRepository;
import com.app.util.JwtUtil;
import com.app.util.SaveCookie;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
    private JavaMailSender javaMailSender;

	@Override
	public User addUser(RegistrationDTO transientUser) {
		BCryptPasswordEncoder encPass=new BCryptPasswordEncoder();
		User user=mapper.map(transientUser, User.class);
		String encryptedPassword=encPass.encode(transientUser.getPassword());
		user.setPassword(encryptedPassword);
		return repo.save(user);
	}

	@Override
	public List<AuthResponseDTO> getAllUser() {
		List<User> userList = repo.findAll();

		List<AuthResponseDTO> authResponseList = new ArrayList<>();
		for (User user : userList) {
			AuthResponseDTO authResponse = mapper.map(user, AuthResponseDTO.class);
			authResponseList.add(authResponse);
		}

		return authResponseList;
	}

	@Override
	public String deleteUser(Integer id) {
		String message = "UserID is invalid , can't delete user details";
		if (repo.existsById(id)) {
			repo.deleteById(id);
			message = "User with userId " + id + " is deleted";
		}
		return message;
	}

	@Override
	public User getUserById(Integer id) {
		return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
	}

	@Override
	public String updateUserDetails(AuthResponseDTO detachedUser) {
	    Integer uid = detachedUser.getUserId();
	    Optional<User> u = repo.findById(uid);

	    if (u.isPresent()) {
	        User existingUser = u.get();
	        String existingPassword = existingUser.getPassword();
	        List<Booking> existingBookings = existingUser.getBookingList();
	        User updatedUser = mapper.map(detachedUser, User.class);
	        updatedUser.setPassword(existingPassword);
	        updatedUser.setBookingList(existingBookings);
	        repo.save(updatedUser);
	        return "updated";
	    } else {
	        return "User not found";
	    }
	}


	// for login
	@Override
	public AuthResponseDTO authenticateUser(AuthRequestDTO request, HttpSession session, HttpServletResponse response) {


		BCryptPasswordEncoder encPass=new BCryptPasswordEncoder();
		User user=repo.findByEmail(request.getEmail()).get();
		if(user != null && encPass.matches(request.getPassword(), user.getPassword())) {
			
				final String jwt =jwtUtil.generateToken(user.getEmail());
				session.setAttribute("user", user);
				SaveCookie.sendToken(jwt, response);
				AuthResponseDTO authRespDTO = mapper.map(user, AuthResponseDTO.class);
				return authRespDTO;
			}else {
				throw new ResourceNotFoundException("Invalid Credientials"); 
			}
	}

	@Override
	public User getUserByEmail(String email) {
		return repo.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
	}

	private final Map<String, String> otpCache = new ConcurrentHashMap<>();
	
	@Override
	public void sendOTPToUserEmail(String email) {
	    String otp = generateRandomOTP();
	    sendOTPEmail(email, otp);
	    otpCache.put(email, otp);
	}

	private String generateRandomOTP() {
	    // Generate a random 6-digit OTP
	    Random random = new Random();
	    int otp = 100000 + random.nextInt(900000);
	    return String.valueOf(otp);
	}

	private void sendOTPEmail(String email, String otp) {
	    SimpleMailMessage message = new SimpleMailMessage();
	    message.setTo(email);
	    message.setSubject("Password Reset OTP");
	    message.setText("Your OTP for password reset is: " + otp);

	    javaMailSender.send(message);
	}
	@Override
	 public String resetPasswordWithOTP(String email, String enteredOTP, String newPassword) {
		 
	        String storedOTP = otpCache.get(email);

	        if (storedOTP != null && storedOTP.equals(enteredOTP)) {
	            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	            String encryptedPassword = passwordEncoder.encode(newPassword);

	            User user = repo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
	            user.setPassword(encryptedPassword);
	            repo.save(user);

	            otpCache.remove(email);

	            return "Password reset successful";
	        } else {
	            return "Invalid OTP";
	        }
	 }
}
