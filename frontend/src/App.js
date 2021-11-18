import './App.css';

import React, { useState } from 'react';
import MainPage from './boundary/pages/MainPage'
import AccountManagementPage from './boundary/pages/AccountManagementPage';
import SignInPage from './boundary/pages/SignInPage';
import Amplify, { Auth, API, Storage } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import axios from 'axios';
import awsconfig from './aws-exports';
import { Config } from "./boundary/common/Config"
import { useSnackbar } from 'notistack';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import RequestController from './services/RequestService';
import OntologyController from './controllers/OntologyController';
import RequestService from './services/RequestService';
import AuthController from "./controllers/AuthController";
import PanelController from './controllers/PanelController';
import Model from "./model/Model";

import store from './model/ModelProxy';
import { Provider } from 'react-redux'

Amplify.configure(awsconfig);

function App() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  var model = new Model();
  var requestService = new RequestService(model, enqueueSnackbar);

  var requestController = new RequestController(model);
  var authController = new AuthController(model);
  var panelController = new PanelController(model);
  var ontologyController = new OntologyController(model, requestService);

  requestController.registerAddRequestSuccessListener((res) => {

    ontologyController.expandItem(res.data.id);
  });


  React.useEffect(() => {

    ontologyController.updateOntology();

  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/signin">
            <SignInPage />
          </Route>
          <Route path="/accounts">
            <AccountManagementPage />
          </Route>
          <Route path="/">

            {panelController.panelOpen("validation_form") && <AmplifyAuthenticator />}
            <MainPage
              model={model}
              authController={authController}
              panelController={panelController}
              ontologyController={ontologyController}
            >
            </MainPage>
          </Route>
        </Switch>
      </Router>
    </Provider>


  );
}

export default App;
