import React, { useState, useEffect } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import tableIcons from '../MaterialTableIcons';
import { Link } from 'react-router-dom';
import StripeContainer from './StripePayment';


export default function Factures() {
    const [factures, setFactures] = useState([]);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        // Fetch factures for the current logged-in user
        axios.get('api/currentuser')
            .then(response => {
                const userId = response.data.currentuser._id;
                axios.get(`api/factures/${userId}`)
                    .then(response => {
                        setFactures(response.data.facture); // Corrected access to response.data.facture
                    })
                    .catch(error => {
                        console.error('Error fetching factures:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            });
    }, []);

    const VoirPDF = (e, pdf) => {
        e.preventDefault();
        window.open(`http://127.0.0.1:8000${pdf}`)

    }

    const handlePaymentClick = (amount) => {
        setSelectedAmount(amount);
        setShowPayment(true);
    };

    return (
        <div className="align-items-center justify-content-between mb-4">
            <MaterialTable
                columns={[
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Numero de facture</h6>,

                        render: rowData => <p >{rowData.numero_facture}</p>,
                        customFilterAndSearch: (term, rowData) => ((rowData.numero_facture).toLowerCase()).indexOf(term.toLowerCase()) !== -1
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Montant à payer</h6>,
                        render: rowData => (
                            <p>
                                {rowData.montant_a_payer}
                            </p>
                        )
                    },

                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Reste à payer</h6>,
                        render: rowData => <p >{rowData.reste_a_payer}</p>
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Prise en charge</h6>,
                        render: rowData => <p>{rowData.prise_en_charge}</p>
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }} >Échéance</h6>,
                        render: rowData => <p>{rowData.echeance}</p>,

                    },
                    {
                        title: '',
                        render: rowData => (

                            <div>
                                {parseFloat(rowData.reste_a_payer) === 0 ? (
                                    <Link to='#' onClick={(e) => VoirPDF(e, rowData.pdf_facture)}>
                                        <button className='btn' style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }}>
                                            <i className="fas fa-eye" style={{ marginRight: '8px' }}></i>
                                            Visualiser
                                        </button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link to='#' onClick={(e) => VoirPDF(e, rowData.pdf_facture)}>
                                            <button className='btn ' style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }}>
                                                <i className="fas fa-eye" style={{ marginRight: '8px' }}></i>
                                                Visualiser
                                            </button>
                                        </Link>
                                        <Link to="#" onClick={() => handlePaymentClick(rowData.reste_a_payer)}>
                                            <button className='btn mt-2' style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }}>
                                                <i className="fas fa-credit-card" style={{ marginRight: '8px' }}></i>
                                                Paiement par carte
                                            </button>
                                        </Link>
                                    </>
                                )}
                                {/* Payment container */}
                                {showPayment && <StripeContainer amount={selectedAmount} />}

                            </div>
                        )
                    }
                ]}
                data={factures}
                title={<h4 >Mes factures</h4>}
                icons={tableIcons}
                options={{
                    padding: 'dense',
                    pageSize: 4,
                    pageSizeOptions: [2, 3, 4],
                }}
            />
        </div>
    );
}
