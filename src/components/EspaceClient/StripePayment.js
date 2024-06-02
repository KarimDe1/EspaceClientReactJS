import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PM93EP08thL8YjU0rYFxQHB7E0QvfefWS3YftiVXOb76yaefza5qau5RZ4W9dL3pAqMMAM68NJcyzIyg895aV8u00kSxVGtAd');

const StripePayment = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        axios.post('/api/create-payment-intent', { amount: amount * 100 }) // Convert amount to cents
            .then(response => {
                setClientSecret(response.data.clientSecret);
            })
            .catch(error => {
                console.error('Error creating payment intent:', error); // Log error details
            });
    }, [amount]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!clientSecret) {
            setError('Client secret not set');
            return;
        }

        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement id="card-element" />
            <button type="submit" disabled={processing}>
                {processing ? 'Processing...' : 'Pay'}
            </button>
            {error && <div>{error}</div>}
        </form>
    );
};

const StripeContainer = ({ amount }) => {
    return (
        <Elements stripe={stripePromise}>
            <StripePayment amount={amount} />
        </Elements>
    );
};

export default StripeContainer;