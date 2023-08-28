//package com.app.entities;
//
//import java.time.LocalDateTime;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.EnumType;
//import javax.persistence.Enumerated;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;
//
//@Entity
//@Table(name="payment_details")
//public class PaymentHistory {
//	
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Integer id;
//	@Column(name="payment_id")
//	private Integer paymentId;
//	@Enumerated(EnumType.STRING)
//	private Payment_Mode paymentMode;
//	@Enumerated(EnumType.STRING)
//    private Payment_Status paymentStatus;
//	@Column(name="update_time")
//	private LocalDateTime updateTime;
//	@Column(name="user_id")
//	private int userId;
//	public Integer getId() {
//		return id;
//	}
//	public void setId(Integer id) {
//		this.id = id;
//	}
//	public Integer getPaymentId() {
//		return paymentId;
//	}
//	public void setPaymentId(Integer paymentId) {
//		this.paymentId = paymentId;
//	}
//	public Payment_Status getPaymentStatus() {
//		return paymentStatus;
//	}
//	public void setPaymentStatus(Payment_Status paymentStatus) {
//		this.paymentStatus = paymentStatus;
//	}
//	public LocalDateTime getUpdateTime() {
//		return updateTime;
//	}
//	public void setUpdateTime(LocalDateTime updateTime) {
//		this.updateTime = updateTime;
//	}
//	public int getUserId() {
//		return userId;
//	}
//	public void setUserId(int userId) {
//		this.userId = userId;
//	}
//	public Payment_Mode getPaymentMode() {
//		return paymentMode;
//	}
//	public void setPaymentMode(Payment_Mode paymentMode) {
//		this.paymentMode = paymentMode;
//	}
//
//}
