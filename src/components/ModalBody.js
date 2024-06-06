import React, { useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import tableIcons from './MaterialTableIcons';
import { Link } from 'react-router-dom';
import StripePayment from '../components/EspaceClient/StripePayment';
import { Modal, Button } from 'react-bootstrap';

const stripePromise = loadStripe('pk_test_51PM93EP08thL8YjU0rYFxQHB7E0QvfefWS3YftiVXOb76yaefza5qau5RZ4W9dL3pAqMMAM68NJcyzIyg895aV8u00kSxVGtAd');

const ModalBody = ({ data, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const handleClose = () => setShowPayment(false);

  const handlePaymentClick = (amount) => {
    setSelectedAmount(amount);
    setShowPayment(true);
  };

  const handleCheckout = async (prix) => {

    if (!prix) {
      console.error("Prix is not defined or empty");
      return;
    }

    try {
      const response = await axios.post('/api/create-payment-intent', { amount: prix * 100 });
      const { clientSecret } = response.data;

      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({
        clientReferenceId: clientSecret,
        successUrl: window.location.origin + '/checkout/success',
        cancelUrl: window.location.origin + '/checkout/cancel',
      });

      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  return (
    <div>
      <MaterialTable
        columns={[
          { title: 'Option Name', field: 'name' },
          { title: 'prix', field: 'prix' }, // Assuming each option has a prix field
          { 
            title: 'Action', 
            render: (rowData) => (
              <Link to="#" onClick={() => handlePaymentClick(rowData.prix)}>
                <button className='btn mt-2' style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }}>
                    <i className="fas fa-credit-card" style={{ marginRight: '8px' }}></i>
                    Paiement par carte
                </button>
            </Link>
            )
          },
        ]}
        data={data}
        icons={tableIcons}
        title="Contract Options"
      />

<Modal show={showPayment} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Paiement par carte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showPayment && <StripePayment amount={selectedAmount} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
  );
}

export default ModalBody;
