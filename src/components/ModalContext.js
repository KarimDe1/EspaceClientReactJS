// ModalContext.js

import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModalContext = () => {
    return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
    const [showPayment, setShowPayment] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);

    return (
        <ModalContext.Provider value={{ showPayment, setShowPayment, filteredOptions, setFilteredOptions }}>
            {children}
        </ModalContext.Provider>
    );
};
