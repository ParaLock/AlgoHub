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
  const [classificationHierarchy, setClassificationHierarchy] = useState(null);
  const [showAuthForm, setShowAuthForm] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [authToken, setAuthToken] = React.useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  var updateHierarchy = (cb = null) => {
    setClassificationHierarchy(null)
    axios.get(Config.API_PATH + `classifications/hierarchy`)
    .then(res => {

      console.log(res.data)

      if(res.data && res.data.hierarchy) {

        res.data.hierarchy = res.data.hierarchy.map((item) => {

          if(!item.parentId)
            item.parentId = ""

          return item;

        })

        setClassificationHierarchy(res.data.hierarchy)
        if(cb) {
          cb(res.data.hierarchy)
        }

      }
    })
  }

  React.useEffect(() => {

    updateHierarchy();

  }, []);

  React.useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {

        console.log(authData)
        console.log(nextAuthState)
        
          if(authData && nextAuthState == "signedin") {

            console.log(authData.signInUserSession.idToken.jwtToken )

            setAuthToken(authData.signInUserSession.idToken.jwtToken)

            var groups = authData.signInUserSession.idToken.payload["cognito:groups"]
            var userId = authData.attributes.sub
  
            setCurrentUser({userId: authData.username, username: authData.username, groups: groups});
          }
      });
  }, []);

  var executeAddRequest = (cb, data, object, endpoint) => {


    axios.post(Config.API_PATH + object + "/" + endpoint,
    data, 
      {
          headers: {
              'Authorization': authToken
          }
      }
      ).then(res => {

        console.log("AddRequest: ", res)

        if(res.data.statusCode == "400" || res.data.statusCode == 400) {

          enqueueSnackbar("Failed to create " + object + "\n" + "error: " + res.data.error, 
          {
              anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
              },
              variant: 'error'
          });

          cb(res.data.error)

        } else {

          enqueueSnackbar("Created " + object + " successfully!", 
          {
              anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
              },
              variant: 'success'
          });

          updateHierarchy((newHierarchy) => {

            var hierarchyElement = newHierarchy.filter((item) => {

              return item.id == res.data.id;
            });

            if(hierarchyElement.length > 0) {

              var temp = {...expandedOntologyItems}

              var expandParents = function(expandedOntologyItems, ontology, hierarchyElement) {

                expandedOntologyItems[hierarchyElement.id] = true

                var parent = ontology.filter((item) => {
                  return item.id == hierarchyElement.parentId;
                });

                if(parent.length == 1) {

                  expandParents(expandedOntologyItems, ontology, parent[0])

                } else {

                  expandedOntologyItems[hierarchyElement.id] = true 
                }
              }

              expandParents(temp, newHierarchy, hierarchyElement[0]);
              setExpandedOntologyItems(temp);
            }

          })

          console.log("success", res)
          cb("")
        }

              
      }).catch((err) => {

        enqueueSnackbar("Failed to create " + object + " :(", 
        {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
            variant: 'error'
        });

        console.log("error", err)
        
        cb("error")
      })

  } 

  var executeGetRequest = (cb, url) => {

    axios.get(Config.API_PATH + url, {
      headers: {
        'Authorization': authToken
      }
    })
    .then(res => {
      console.log("GetRequest: ", res)

      if(res.data && res.data.statusCode !== 400 || res.data.statusCode !== "400") {

        cb("", res.data)
      
      } else {

        cb(res.data.error ?? "error", null)
      }
    }).catch(res => {

      cb("error", null)
    })
  }

  var addAlgorithm = (data, cb) => {
    console.log("add algorithm data: ", data)
    executeAddRequest(cb,  {
        name: data.algorithmName,
        description: data.algorithmDescription,
        classificationId: data.parentClassificationId,
        authorId: currentUser.userId
      
    }, "algorithms", "add")
  }

  var addClassification = (data, cb) => {

    if(data.parentClassificationId == "")
      data.parentClassificationId = null

      executeAddRequest(cb,  {
        name: data.classificationName,
        parentId: data.parentClassificationId,
        authorId: currentUser.userId

    }, "classifications", "add")

  }

  var addImplementation = (data, cb) => {

    executeAddRequest(cb,  {
      name: data.name,
      algorithmId: data.parentId,
      extension: data.fileExtension,
      algorithmName: data.parentName,
      authorId: currentUser.userId,
      sourceCodeBase64: data.implementationCode
    }, "implementations", "add")
  }

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
    console.log("selected ontology item: ", item)


    if(item.typeName == "algorithm") {
      setSelectedAlgorithm(null)
      executeGetRequest((err, data) => {
        if(err.length == 0)
          setSelectedAlgorithm(data)
      }, "algorithms/" + item.id)  
    }

    if(item.typeName == "implementation") {
      setSelectedImplementation(null)
      executeGetRequest((err, data) => {
        if(err.length == 0) {

          setSelectedImplementation(data)
        }
      }, "implementations/" + item.id)  
    }

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
                  selectedAlgorithm={selectedAlgorithm}
                  setSelectedOntologyItem={onOntologySelect}
                  selectedOntologyItem={selectedOntologyItem}
                  toggleableItems={toggleableItems}
                  addAlgorithm={addAlgorithm}
                  addClassification={addClassification}
                  addImplementation={addImplementation}
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
