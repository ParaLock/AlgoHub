import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SnackbarProvider } from "notistack";
import store from './model/ModelProxy';
import { Provider } from 'react-redux'

ReactDOM.render(
  <SnackbarProvider maxSnack={10} preventDuplicate>
    <Provider store={store}>
      <App />
    </Provider>
    </SnackbarProvider>,
  document.getElementById('root')
);

