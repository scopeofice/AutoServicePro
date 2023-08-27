import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const PaymentGateway = ({ totalAmount, onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div>
      <h3>Total Amount: {totalAmount}</h3>
      <Button variant="success" onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay'}
      </Button>
    </div>
  );
};

export default PaymentGateway;
