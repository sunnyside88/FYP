import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from "react-redux";
import rootReducer from './reducers';

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension';




const store = createStore(rootReducer,composeWithDevTools())

ReactDOM.render(
     <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
 
  ,document.getElementById('root')
);

reportWebVitals();
