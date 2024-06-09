import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import OptionPayment from '../components/EspaceClient/OptionPayment';
import { loadStripe } from '@stripe/stripe-js';
import { Modal, Button } from 'react-bootstrap';
import tableIcons from './MaterialTableIcons';
import { Elements } from '@stripe/react-stripe-js'; // Import Elements

const ModalBody = ({ data, contratId, onClose }) => {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    const stripePromise = loadStripe('pk_test_51PM93EP08thL8YjU0rYFxQHB7E0QvfefWS3YftiVXOb76yaefza5qau5RZ4W9dL3pAqMMAM68NJcyzIyg895aV8u00kSxVGtAd');

    const handlePaymentClick = (amount) => {
        setSelectedAmount(amount);
        setShowPayment(true);
    };

    const handleClosePayment = () => {
        setShowPayment(false);
    };

    return (
        <div>
            <MaterialTable
                columns={[
                    { title: 'Option Name', field: 'name' },
                    { title: 'Prix', field: 'prix' },
                    {
                        title: 'Description',
                        render: rowData => (
                            <div>
                                <button className='btn' style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }}
                                    onClick={() => handlePaymentClick(rowData.prix)}>
                                    <i className="fas fa-credit-card" style={{ marginRight: '8px' }}></i>
                                    Acheter
                                </button>
                            </div>
                        )
                    },
                ]}
                data={data}
                icons={tableIcons}
                title="Contract Options"
            />

            <Modal show={showPayment} onHide={handleClosePayment}>
                <Modal.Header closeButton>
                    <Modal.Title>Paiement par carte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showPayment && (
                        <Elements stripe={stripePromise}>
                            <OptionPayment amount={selectedAmount} contratId={contratId} />
                        </Elements>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePayment}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalBody;
