import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import BasketStore from './store/BasketStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        basket: new BasketStore()
      }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Context.Provider>
  </BrowserRouter>

);