import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductsContextProvider } from './context/ProductContext';
import { OrganisationsContextProvider } from './context/OrganisationContext';
import { ControlsContextProvider } from './context/ControlContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ControlsContextProvider>
      <ProductsContextProvider>
        <OrganisationsContextProvider>
          <App />
        </OrganisationsContextProvider>
      </ProductsContextProvider>
    </ControlsContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

