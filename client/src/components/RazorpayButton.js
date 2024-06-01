import React, { useEffect } from 'react';

const RazorpayButton = ({ paymentButtonId, children }) => {
    useEffect(() => {
        

const data = localStorage.getItem("userdata")
const data2 = JSON.parse(data)

if(data2){
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.async = true;
    script.setAttribute('data-payment_button_id', paymentButtonId);

    const form = document.createElement('form');
    form.appendChild(script);

    document.getElementById(`razorpay-container-${paymentButtonId}`).appendChild(form);

    // return () => {
    //     document.getElementById(`razorpay-container-${paymentButtonId}`).removeChild(form);
    // };
}
    }, [paymentButtonId]);

    return <div id={`razorpay-container-${paymentButtonId}`}>{children}</div>;
};

export default RazorpayButton;
