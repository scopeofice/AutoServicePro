package com.app.dto;

import com.app.entities.Payment_Mode;
import com.app.entities.Payment_Status;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDateTime;

@Getter
@Setter
public class PaymentResponseDTO {

    private Integer paymentId;
    private LocalDateTime paymentDate;
    private double amount;
    private Payment_Status paymentStatus;
    private Payment_Mode paymentMode;
}
