import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from "mobx"
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

configure({ enforceActions: true })
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
