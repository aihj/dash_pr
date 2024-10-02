import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './App.css';
import './style.css';
import './index.css';


// import LineChart from './Chart';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const menu = document.querySelector(".navbar__menu");

root.render(
  <React.StrictMode>
    
    <App />
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
