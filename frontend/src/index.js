import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import store from './Store';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { BrowserRouter } from 'react-router-dom';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>

          <App />

        </AlertProvider>
      </Provider>
    </StrictMode>
  </BrowserRouter>
);


