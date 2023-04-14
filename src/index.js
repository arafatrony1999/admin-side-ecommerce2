import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CatagoryProvider } from './context/CatagoryContext';
import { SubCatagoryProvider } from './context/SubCatagoryContext';
import { OfferProvider } from './context/OfferContext';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <CatagoryProvider>
        <SubCatagoryProvider>
          <OfferProvider>
            <ProductProvider>
              <App />
            </ProductProvider>
          </OfferProvider>
        </SubCatagoryProvider>
      </CatagoryProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
