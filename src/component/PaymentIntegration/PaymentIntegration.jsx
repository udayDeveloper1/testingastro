
import React, { useEffect, useState } from "react";

const RazorpayOwnCheckout = () => {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () => console.error("Failed to load Razorpay SDK");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!isRazorpayLoaded) {
      alert("Razorpay SDK not loaded yet. Please try again in a moment.");
      return;
    }

    const options = {
      key: "rzp_test_mh2PkrMuTEOn3p",
      amount: 1000,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "",
      prefill: {
        email: "test@example.com",
        contact: "9999999999",
      },
      handler: function (response) {
        alert("Payment ID: " + response.razorpay_payment_id);
      },
      config: {
        display: {
          preferences: {
            show_default_blocks: true,
          },
        },
      },
      modal: {
        ondismiss: function () {
          const confirmClose = window.confirm(
            "Are you sure you want to close the payment form?"
          );
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <button
        className="btn btn-outline-dark btn-lg"
        onClick={handlePayment}
        disabled={!isRazorpayLoaded}
      >
        <i className="fas fa-money-bill"></i> Own Checkout
      </button>
    </div>
  );
};

export default RazorpayOwnCheckout;
