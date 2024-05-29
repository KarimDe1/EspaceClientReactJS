import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from '../MaterialTableIcons';
import swal from 'sweetalert';

export default function Factures() {

    const [ProfileUserInput, setProfileUser] = useState({
        id: '',
        numeroFacture: '',
        montantAPayer: '',
        resteAPayer: '',
        priseEnCharge: '',
        echeance: ''


    });
    const mockData = [
        {
          id: 1,
          numeroFacture: '20241723248',
          montantAPayer: '53,937',
          resteAPayer: '53,937',
          priseEnCharge: 'non',
          echeance: '14/06/2024'
        },
        {
            id: 2,
            numeroFacture: '20241723248',
            montantAPayer: '53,937',
            resteAPayer: '53,937',
            priseEnCharge: 'non',
            echeance: '14/06/2024'
          },
        // Add more mock data items as needed
      ];
      const showFormUpdateProfil = (e, clientId) => {

            e.preventDefault();
        
        axios.get(`/api/factures/${clientId}`).then(res => {
            if (res.data.status === 200) {
                setProfileUser(res.data.user);
            } else if (res.data.status === 404) {//si l'utilisateur non trouvé
                //afficher un message d'erreur
                swal("", res.data.message, "error");
            }

        });
    }



  
    return (
        <div style={{ overflowX: 'auto', width: '100vw' }}>
            <MaterialTable
                columns={[
                    {
                        title: 'Numero de facture',
                        render: rowData => (
                            <div className=" px-2 py-1">
                                <div className= "flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">{ProfileUserInput.numeroFacture}</h6>
                                </div>
                            </div>
                        ),
                    // customFilterAndSearch: (term, rowData) => ((rowData.Firstname).toLowerCase()).indexOf(term.toLowerCase()) !== -1
                    },
                    {
                        title: 'Montant à payer',
                        render: rowData => (
                            <p className="text-xs font-weight-bold mb-0">
                              {ProfileUserInput.montantAPayer}
                            </p>
                        )
                    },
                    
                    {
                        title: 'Reste à payer',
                        render: rowData => <p className="text-xs font-weight-bold mb-0">53,937</p>
                    },
                    {
                        title: 'Prise en charge',
                        render: rowData => <p className="text-xs font-weight-bold mb-0">non</p>
                    },
                    {
                        title: 'Échéance',
                        render: rowData => <p className="text-xs font-weight-bold mb-0">14/06/2024</p>,
                      //  customFilterAndSearch: (term, rowData) => (rowData.Email.toLowerCase()).indexOf(term.toLowerCase()) !== -1
                    },
                    {
                        title: 'Actions',
                        render: rowData => (
                            <div>
                                {/* <Link to={`/admin/user/edit/${rowData._id}`}>
                                    <i className="fas fa-edit" style={{ color: '#FEE502', marginRight: '8px' }}></i>
                                </Link>
                                <i className="fas fa-trash" style={{ color: 'red', cursor: 'pointer' }} onClick={() => setDeleteUserId(rowData._id)}></i> */}
                            </div>
                        )
                    }
                ]}
                data={mockData}
                title={<h6>Mes factures</h6>}
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