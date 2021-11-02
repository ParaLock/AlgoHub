import './App.css';

import React, { useState } from 'react';
import MainPage from './boundary/pages/MainPage'
import AccountManagementPage from './boundary/pages/AccountManagementPage';
import SignInPage from './boundary/pages/SignInPage';

import Amplify, { Auth, API } from 'aws-amplify';

import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import axios from 'axios';
import awsconfig from './aws-exports';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
Amplify.configure(awsconfig);





const ontologyData = [

  { id: 1, content: "Algorithms", parentId: 0, type: "classification" },
  { id: 2, content: "Sorting", parentId: 1, type: "classification" },
  { id: 3, content: "Computational Geometry", parentId: 1, type: "classification" },
  { id: 4, content: "Nearest Neighbor", parentId: 3, type: "algorithm" },
  { id: 5, content: "Convex Hull", parentId: 3, type: "algorithm" },
  { id: 6, content: "Graph Algorithms", parentId: 1, type: "classification" },
  { id: 7, content: "Search", parentId: 6, type: "classification" },
  { id: 8, content: "Breadth-First Search", parentId: 7, type: "algorithm" },
  { id: 9, content: "Depth-First Search", parentId: 7, type: "algorithm" },
  { id: 10, content: "C++", parentId: 9, type: "implementation" },
  { id: 11, content: "Java", parentId: 9, type: "implementation" }

]

const problemInstanceData = [

  {
    parent: "Convex Hull",
    name: "Worst case",
    inputSize: 128
  },
  {
    parent: "Depth-First Search",
    name: "Average case",
    inputSize: 32
  },
  {
    parent: "Depth-First Search",
    name: "Worst case",
    inputSize: 256
  },
  {
    parent: "Depth-First Search",
    name: "Best case",
    inputSize: 16
  }

]

const benchmarkData = [
  {
    parent: "Depth-First Search.C++",
    id: 1,
    machine: {
      CPU: "Intel core i7",
      Memory: "8GB",
      L1: "1kb",
      L2: "5kb",
      L3: "10kb"
    },
    memoryUsage: "10mb",
    executionTime: "5min",
    inputSize: 32,
    problemInstance: "Worst Case"
  },
  {
    parent: "Depth-First Search.C++",
    id: 2,
    machine: {
      CPU: "Intel core i9",
      Memory: "16GB",
      L1: "1kb",
      L2: "5kb",
      L3: "10kb"
    },
    memoryUsage: "15mb",
    executionTime: "3min",
    inputSize: 32,
    problemInstance: "Worst Case"
  },
  {
    parent: "Depth-First Search.C++",
    id: 3,
    machine: {
      CPU: "Intel core i9",
      Memory: "16GB",
      L1: "1kb",
      L2: "5kb",
      L3: "10kb"
    },
    memoryUsage: "15mb",
    executionTime: "3min",
    inputSize: 128,
    problemInstance: "Worst Case"
  },
  {
    parent: "Depth-First Search.Java",
    id: 4,
    machine: {
      CPU: "Intel core i9",
      Memory: "16GB",
      L1: "1kb",
      L2: "5kb",
      L3: "10kb"
    },
    memoryUsage: "150mb",
    executionTime: "20min",
    inputSize: 256,
    problemInstance: "Worst Case"
  },
  {
    parent: "Depth-First Search.Java",
    id: 5,
    machine: {
      CPU: "Intel core i9",
      Memory: "16GB",
      L1: "1kb",
      L2: "5kb",
      L3: "10kb"
    },
    memoryUsage: "150mb",
    executionTime: "20min",
    inputSize: 256,
    problemInstance: "Worst Case"
  },
  {
    parent: "Depth-First Search.Java",
    id: 6,
    machine: {
      CPU: "Intel core i9",
      Memory: "16GB",
      L1: "1kb",
      L2: "5kb",
      L3: "10kb"
    },
    memoryUsage: "150mb",
    executionTime: "20min",
    inputSize: 256,
    problemInstance: "Worst Case"
  },
  {
    parent: "Depth-First Search.Java",
    id: 7,
    machine: {
      CPU: "Intel core i9",
      Memory: "16GB",
      L1: "1kb",
      L2: "5kb",
      L3: "10kb"
    },
    memoryUsage: "150mb",
    executionTime: "20min",
    inputSize: 256,
    problemInstance: "Worst Case"
  },
  {
    parent: "Depth-First Search.Java",
    id: 8,
    machine: {
      CPU: "Intel core i9",
      Memory: "16GB",
      L1: "1kb",
      L2: "5kb",
      L3: "10kb"
    },
    memoryUsage: "150mb",
    executionTime: "20min",
    inputSize: 256,
    problemInstance: "Worst Case"
  },
  {
    parent: "Depth-First Search.Java",
    id: 9,
    machine: {
      CPU: "Intel core i9",
      Memory: "16GB",
      L1: "1kb",
      L2: "5kb",
      L3: "10kb"
    },
    memoryUsage: "150mb",
    executionTime: "20min",
    inputSize: 256,
    problemInstance: "Worst Case"
  },
  {
    parent: "Depth-First Search.Java",
    id: 10,
    machine: {
      CPU: "Intel core i9",
      Memory: "16GB",
      L1: "1kb",
      L2: "5kb",
      L3: "10kb"
    },
    memoryUsage: "150mb",
    executionTime: "20min",
    inputSize: 256,
    problemInstance: "Worst Case"
  }
]

var API_PATH = "https://p0j2bbly07.execute-api.us-east-1.amazonaws.com/beta/";

function App() {

  const [toggleableItems, setToggleableItems] = useState([]);
  const [selectedOntologyItem, setSelectedOntologyItem] = useState({});
  const [expandedOntologyItems, setExpandedOntologyItems] = useState({});
  const [classificationHierarchy, setClassificationHierarchy] = useState([]);

  const [showAuthForm, setShowAuthForm] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    axios.get(API_PATH + `classifications/hierarchy`)
    .then(res => {

      if(res.data && res.data.hierarchy) {

        setClassificationHierarchy(res.data.hierarchy)

      }
    })

  }, []);

  React.useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {

        console.log(authData)
        console.log(nextAuthState)
        
          if(authData && nextAuthState == "signedin") {

            console.log(authData.signInUserSession.idToken.jwtToken )

            
            var groups = authData.signInUserSession.idToken.payload["cognito:groups"]
            var userId = authData.attributes.sub
  

            setCurrentUser({userId: userId, username: authData.username, groups: groups});
          }
      });
  }, []);

  var removeItemFromArray = (array, item) => {
    var index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  var toggleItem = (item, state = null) => {

    var copy = [...toggleableItems];

    if (state != null) {

      if (state) {

        copy.push(item);

      } else {

        removeItemFromArray(copy, item);
      }
    }  else {

      var index = copy.indexOf(item);

      if(index == -1) {

        copy.push(item);

      } else {

        removeItemFromArray(copy, item);
      }

    }

    setToggleableItems(copy);
  }

  var onLogin = ()=> {

    setShowAuthForm(true)

  }

  var onLogout = () => {

    setShowAuthForm(false)
    Auth.signOut()
    setCurrentUser(null)
  }

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

          {showAuthForm && <AmplifyAuthenticator/>}
          <MainPage
            currentUser={currentUser}
            onLogin={onLogin}
            onLogout={onLogout}

            ontologyData={classificationHierarchy}
            benchmarkData={benchmarkData}
            problemInstanceData={problemInstanceData}

            setSelectedOntologyItem={(item) => setSelectedOntologyItem(item)}

            selectedOntologyItem={selectedOntologyItem}

            toggleableItems={toggleableItems}
            toggleItem={(item, state) => toggleItem(item, state)}

            expandedOntologyItems={expandedOntologyItems}

          >
          </MainPage>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
