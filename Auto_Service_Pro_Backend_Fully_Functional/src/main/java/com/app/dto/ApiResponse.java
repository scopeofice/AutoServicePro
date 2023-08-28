package com.app.dto;

import java.time.LocalDateTime;

import lombok.Getter;

//@NoArgsConstructor
//@AllArgsConstructor
@Getter
//@Setter
//@ToString
//@EqualsAndHashCode
public class ApiResponse {
	private String message;
	private LocalDateTime timestamp;
	public ApiResponse(String message) {
		super();
		this.message = message;
		this.timestamp=LocalDateTime.now();
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	
	
}
