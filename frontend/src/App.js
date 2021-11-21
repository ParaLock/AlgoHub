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
import store from './model/ModelProxy';
import { Provider } from 'react-redux'
import { updateOperationStatus } from "./model/ViewModel";

Amplify.configure(awsconfig);

function App() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  var requestService = new RequestService();
  var requestController = new RequestController();
  var authController = new AuthController();
  var panelController = new PanelController();
  var ontologyController = new OntologyController(requestService);

  requestController.registerAddRequestSuccessListener((res) => {

    ontologyController.expandItem(res.data.id);
  });

  function handleOperationalStatus() {

    var statusList = store.getState().viewModel.operationStatus;

    // for (const [statusName, status] of Object.entries(statusList)) {

    //   if (status.status == "request_complete") {

    //     enqueueSnackbar(status.msg,
    //       {
    //         anchorOrigin: {
    //           vertical: 'bottom',
    //           horizontal: 'right',
    //         },
    //         variant: status.type
    //       });
    //   }

    //   if (status.status == "loading_complete") {

    //     closeSnackbar(status.widgetKey);
    //     store.dispatch(updateOperationStatus({
    //       name: statusName,
    //       widgetKey: "",
    //       status: "",
    //       msg: "",
    //       type: status.type
    //     }))
    //   }

    //   if (status.status == "loading_started") {

    //     var key = enqueueSnackbar(status.msg,
    //       {
    //         anchorOrigin: {
    //           vertical: 'bottom',
    //           horizontal: 'right',
    //         },
    //         variant: status.type
    //       });

    //     store.dispatch(updateOperationStatus({
    //       name: statusName,
    //       widgetKey: key,
    //       status: "loading_started",
    //       msg: "",
    //       type: status.type
    //     }))
    //   }

    // }


  }

  store.subscribe(handleOperationalStatus)

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
