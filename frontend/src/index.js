import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { VideoContextProvider } from './context/VideoContext'


ReactDOM.render(
  <React.StrictMode>
    <VideoContextProvider>
      <App />
    </VideoContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
