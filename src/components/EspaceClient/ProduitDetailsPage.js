import React from 'react';
import { useLocation } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from '../MaterialTableIcons';


export default function ProduitDetails() {
    const location = useLocation();
    const produits = location.state.produit;

    return (
        <div>
            <MaterialTable
                columns={[
                    {
                        title: 'Nom Commercial',
                        field: 'nom_commercial'
                    },
                    {
                        title: 'Référence',
                        field: 'reference'
                    },
                    {
                        title: 'Etat',
                        field: 'etat'
                    },
                    {
                        title: 'Etat Service',
                        field: 'etat_service'
                    },
                    {
                        title: 'Action',
                        render: rowData => (
                            <div>
                                <button className='btn' style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }} onClick="">
                                    <i className="fas fa-credit-card" style={{ marginRight: '8px' }}></i>
                                    Acheter
                                </button>
                            </div>
                        )
                    }
                ]}
                data={produits}
                title={<h4>Liste des Produits</h4>}
                icons={tableIcons}
                options={{
                    search: true,
                    paging: true,
                    pageSize: 5,
                    pageSizeOptions: [5, 10, 20],
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    }
                }}
            />
        </div>
    );
}
