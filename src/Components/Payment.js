import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";

const Payment = ({
    city,
    museum,
    date,
    name,
    email,
    children,
    adults,
    idFile,
    amount,
    onSuccess }) => {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    const getClientToken = async () => {
      try {
        // Fetch the client token from your server
        const response = await fetch(`https://booking-backend-4.onrender.com/api//braintree/token`); // Update with your API endpoint
        const { clientToken } = await response.json(); // Assuming response is a JSON object with a clientToken property
        setClientToken(clientToken);
      } catch (error) {
        console.error("Error fetching client token:", error);
      }
    };

    getClientToken();
  }, []);

  const buy = async () => {
    try {
      if (instance) {
        // Request the payment method nonce from the Drop-in UI
        const { nonce } = await instance.requestPaymentMethod();
        
        // Send the nonce and payment details to your server
        const paymentResponse = await fetch(`https://booking-backend-4.onrender.com/api//braintree/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city:city, 
            museum:museum, 
            date:date,
            name:name, 
            email:email, 
            children:children, 
            adult:adults, 
            id:idFile,
            amount: amount,
            paymentMethodNonce: nonce, // Send the amount to your server
          }),
        });

        const result = await paymentResponse.json();

        if (result.success) {
          // Call the onSuccess callback with payment details
          onSuccess(result);
        } else {
          alert("Payment failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  if (!clientToken) {
    return <h1>Loading payment options...</h1>;
  }

  return (
    <div>
      <DropIn
        options={{ authorization: clientToken }}
        onInstance={(instance) => setInstance(instance)}
      />
      <button onClick={buy}>Pay Now</button>
    </div>
  );
};

export default Payment;
