import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CatagoryProvider } from './context/CatagoryContext';
import { SubCatagoryProvider } from './context/SubCatagoryContext';
import { OfferProvider } from './context/OfferContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CatagoryProvider>
      <SubCatagoryProvider>
        <OfferProvider>
          <App />
        </OfferProvider>
      </SubCatagoryProvider>
    </CatagoryProvider>
  </React.StrictMode>
);

reportWebVitals();
