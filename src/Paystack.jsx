import React from 'react';
import { PaystackButton } from '@paystack/inline-js';

const PaystackPayment = ({ email, amount, onSuccess, onClose }) => {
  const publicKey = 'pk_test_966b4c5fff18686ed5a93938cc228507e0bc9817'; 
  const componentProps = {
    email,
    amount: amount * 100, 
    metadata: {
      custom_fields: [
        {
          display_name: "Mobile Number",
          variable_name: "mobile_number",
          value: "2348012345678",
        }
      ]
    },
    publicKey,
    text: "Pay Now",
    onSuccess,
    onClose,
  };

  return (
    <div>
      <PaystackButton {...componentProps} />
    </div>
  );
};

export default PaystackPayment;
