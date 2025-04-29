import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useAuth from '../../Components/Hooks/UseAuth';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckOut = () => {
    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                color: "#6B3E2A", // A warm color matching a matrimony theme
                fontFamily: 'Georgia, serif',
                fontSize: "18px",
                "::placeholder": {
                    color: "#D0A59F", // Light and elegant placeholder color
                },
                lineHeight: "24px",
            },
            invalid: {
                color: "#e25353", // Error color for invalid input
                iconColor: "#e25353",
            },
        },
    };



    const { id } = useParams();
    const location = useLocation();

    const state = location.state;

    


    const searchParams = new URLSearchParams(location.search);
    const biodataId = searchParams.get('biodataId'); // Get the biodataId query parameter

    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selfEmail, setSelfEmail] = useState(user?.email || "");
    const [formData, setFormData] = useState({
        biodataId: biodataId,
        selfEmail: selfEmail,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const res = await fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 500 }),
        });

        const { clientSecret } = await res.json();
        const cardElement = elements.getElement(CardElement);

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (paymentResult.error) {
            console.log(paymentResult.error.message);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                console.log('Payment Successful!');
                setSuccess(true);

                if (paymentResult.paymentIntent.status === 'succeeded') {
                    console.log('Payment Successful!');
                    setSuccess(true);

                    // Save Contact Request
                    const contactRequestData = {
                        biodataId: parseInt(biodataId), // store as number for easier comparison
                        selfEmail: user?.email,
                        biodataName: location.state?.name, // from passed data
                        contactEmail: location.state?.email,
                        mobileNumber: location.state?.mobile,
                        status: "pending",
                        requestDate: new Date(),
                    };

                    await fetch('http://localhost:5000/contact-requests', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(contactRequestData),
                    });
                }


            }
        }

        setIsProcessing(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-200 via-pink-100 to-pink-300 p-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-pink-600 mb-6">Request Contact Information</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Readonly Biodata ID and Email */}
                    <div>
                        <label className="text-gray-700 text-lg font-semibold">Biodata ID</label>
                        <input
                            type="text"
                            name="biodataId"
                            value={formData.biodataId}
                            readOnly
                            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 text-lg font-semibold">Your Email</label>
                        <input
                            type="email"
                            name="selfEmail"
                            value={formData.selfEmail}
                            readOnly
                            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    {/* Stripe Card Element */}
                    <div className="p-4 border-2 border-gray-300 rounded-lg">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Card Information</label>
                        <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </div>
                    <button
                        type="submit"
                        disabled={!stripe || isProcessing}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        {isProcessing ? "Processing..." : "Submit Request"}
                    </button>
                </form>

                {success && (
                    <p className="text-green-500 text-center mt-6 font-semibold">
                        🎉 Payment Successful! You can now contact the biodata owner.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CheckOut;
