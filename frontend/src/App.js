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
import {Config} from "./boundary/common/Config"

import { useSnackbar } from 'notistack';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

Amplify.configure(awsconfig);

const problemInstanceData = [

  {
    parent: "i1",
    name: "Worst case",
    inputSize: 128
  },
  {
    parent: "i1",
    name: "Average case",
    inputSize: 32
  },
  {
    parent: "i2",
    name: "Best case",
    inputSize: 16
  }

]

const algorithmData = [

  {
    id: "a1",
    description: "This algorithm is awesome"
  },
  {
    id: "a2",
    description: "This algorithm is also awesome"
  },

]


const implementationData = [

  {
    id: "i1",
    parent: "a1",
    sourceCodeFilename: "https://cs509-algohub-storage.s3.amazonaws.com/implementations/dfs_haskell.txt",
    name: "C++" 
  },
  {
    id: "i2",
    parent: "a2",
    sourceCodeFilename: "https://cs509-algohub-storage.s3.amazonaws.com/implementations/dfs_haskell.txt",
    name: "Java" 
  }
]

const benchmarkData = [
  {
    parent: "i1",
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
    parent: "i1",
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
    parent: "i1",
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
    parent: "i2",
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
    parent: "i2",
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
    parent: "i2",
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
    parent: "i2",
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
    parent: "i2",
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
    parent: "i2",
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
    parent: "i2",
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


function App() {

  const [toggleableItems, setToggleableItems] = useState([]);
  const [selectedOntologyItem, setSelectedOntologyItem] = useState({});
  const [selectedAlgorithm, setSelectedAlgorithm] = useState({});
  const [selectedImplementation, setSelectedImplementation] = useState(null);
  const [selectedProblemInstances, setSelectedProblemInstances] = useState([]);
  const [selectedBenchmarks, setSelectedBenchmarks] = useState([]);
  const [expandedOntologyItems, setExpandedOntologyItems] = useState({});
  const [classificationHierarchy, setClassificationHierarchy] = useState([]);
  const [showAuthForm, setShowAuthForm] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  React.useEffect(() => {

    axios.get(Config.API_PATH + `classifications/hierarchy`)
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

  var onOntologySelect = (item) => {

    setSelectedOntologyItem(item)

    var implementations = implementationData.filter((candidate) => candidate.id == item.id)

    if(implementations.length > 0) {
      setSelectedImplementation(implementations[0])
    }

    var algorithms = algorithmData.filter((candidate) => candidate.id == item.id)

    if(algorithms.length > 0) {
      setSelectedAlgorithm(algorithms[0])
    }


    var problemInstances = problemInstanceData.filter((candidate) => candidate.parent == item.id);
    setSelectedProblemInstances(problemInstances)

    var benchmarks = benchmarkData.filter((candidate) => candidate.parent == item.id);
    setSelectedBenchmarks(benchmarks)
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
                  selectedBenchmarks={benchmarkData}
                  selectedProblemInstances={selectedProblemInstances}
                  selectedImplementation={selectedImplementation}
                  setSelectedOntologyItem={onOntologySelect}
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
