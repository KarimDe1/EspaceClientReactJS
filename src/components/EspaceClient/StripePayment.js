import React, { useState , useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PM93EP08thL8YjU0rYFxQHB7E0QvfefWS3YftiVXOb76yaefza5qau5RZ4W9dL3pAqMMAM68NJcyzIyg895aV8u00kSxVGtAd');

const StripePayment = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        axios.post('/api/create-payment-intent', { amount })
            .then(response => {
                setClientSecret(response.data.clientSecret);
            });
    }, [amount]);

    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement id="card-element" onChange={handleChange} />
            <button disabled={processing || disabled || succeeded} id="submit">
                <span id="button-text">
                    {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
                </span>
            </button>
            {error && <div className="card-error" role="alert">{error}</div>}
            <p className={succeeded ? "result-message" : "result-message hidden"}>
                Payment succeeded, see the result in your
                <a href={`https://dashboard.stripe.com/test/payments`}>Stripe dashboard.</a> Refresh the page to pay again.
            </p>
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
