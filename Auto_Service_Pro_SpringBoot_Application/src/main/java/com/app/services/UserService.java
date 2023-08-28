package com.app.services;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.app.dto.AuthRequestDTO;
import com.app.dto.AuthResponseDTO;
import com.app.dto.AuthoResponseToken;
import com.app.dto.RegistrationDTO;
import com.app.entities.User;

public interface UserService {
	User addUser(RegistrationDTO transientUser);
	List<AuthResponseDTO> getAllUser();
	String deleteUser(Integer id);
	User getUserById(Integer id);
	String updateUserDetails(AuthResponseDTO detachedUser);
	User getUserByEmail(String email);
	AuthoResponseToken authenticateUser(AuthRequestDTO request, HttpSession session, HttpServletResponse response);
}
