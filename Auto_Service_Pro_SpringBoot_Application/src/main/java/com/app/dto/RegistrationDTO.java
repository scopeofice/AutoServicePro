package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.app.entities.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationDTO {
	@NotBlank
    private String firstName;
	@NotBlank
    private String lastName;
	@Email
    private String email;
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})"
			, message = "Invalid password!!!")
	@NotBlank
    private String password;
	@Pattern(regexp = "\\d{10}", message = "Phone number must be a 10-digit number.")

	private String phoneNumber;
	
	private Role role;


}
