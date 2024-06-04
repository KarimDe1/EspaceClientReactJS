// ModalBody.js
import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from './MaterialTableIcons';
const ModalBody = ({ data, onClose }) => {
  return (
    <div>
      <MaterialTable
        columns={[
          { 
              title: 'Option Name', 
              field: 'name' 
          },
          { 
              title: 'Description', 
              render: () => (
                <div>
                    <button className='btn' style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }} onClick="">
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
    </div>
  );
}

export default ModalBody;
