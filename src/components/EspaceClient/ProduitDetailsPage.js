import React from 'react';
import { useLocation } from 'react-router-dom';
import MaterialTable from 'material-table';

export default function ProduitDetails() {
    const location = useLocation();
    const produits = location.state.produit;
    console.log(produits);

    const columns = [
      {
          title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Nom Commercial</h6>,
          field: 'ref_produit_contrat'
      },
        {
            title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Nom Commercial</h6>,
            field: 'nom_commercial'
        },
        {
            title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Référence</h6>,
            field: 'reference'
        },
        {
            title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Etat</h6>,
            field: 'etat'
        },
        {
            title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Etat Service</h6>,
            field: 'etat_service'
        }
    ];

    return (
        <MaterialTable
            columns={columns}
            data={produits}
            title={<h4>Liste des Produits</h4>}
            options={{
                search: false,
                paging: false,
                filtering: false,
                exportButton: false,
                headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF'
                }
            }}
        />
    );
}
