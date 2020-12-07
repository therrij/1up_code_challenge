import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { StateProvider } from './store';
import './global.css';

const app = (
    <StateProvider>
        <App />
    </StateProvider>
);

ReactDOM.render(app, document.getElementById('root'));
