import './App.css';

import React, { useState } from 'react';
import styled from 'styled-components';

import MainPage from './boundary/pages/MainPage'
import AccountManagementPage from './boundary/pages/AccountManagementPage';
import SignInPage from './boundary/pages/SignInPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {


  return (
    <Router>

      <Switch>
        <Route path="/signin">
          <SignInPage />
        </Route>
        <Route path="/accounts">
          <AccountManagementPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
