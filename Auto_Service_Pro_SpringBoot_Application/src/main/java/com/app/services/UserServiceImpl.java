package com.app.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.AuthRequestDTO;
import com.app.dto.AuthResponseDTO;
import com.app.dto.AuthoResponseToken;
import com.app.dto.RegistrationDTO;
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

	@Override
	public User addUser(RegistrationDTO transientUser) {
		User user=mapper.map(transientUser, User.class);
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
		Integer uid=detachedUser.getUserId();
		Optional<User> u=repo.findById(uid);
		User use=u.get();
		String pass=use.getPassword();
		User user=mapper.map(detachedUser, User.class);
		user.setPassword(pass);
		repo.save(user);
		return "updated";
	}

	// for login
	@Override
	public AuthoResponseToken authenticateUser(AuthRequestDTO request, HttpSession session, HttpServletResponse response) {



		User user = repo.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Emp not found : Invalid Email or password"));
		System.out.println(user.toString());
		final String jwt = jwtUtil.generateToken(user.getEmail());
//				Optional<User> opUser = userRepo.findById(user.getId());
		session.setAttribute("user", user);
		 SaveCookie.sendToken(jwt, response);
		AuthResponseDTO authRespDTO = mapper.map(user, AuthResponseDTO.class);
		return new AuthoResponseToken(jwt);
	}

	@Override
	public User getUserByEmail(String email) {
		return repo.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
	}

}
