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
import BenchmarkForm from './boundary/forms/BenchmarkForm';


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


function App() {

  const [toggleableItems, setToggleableItems] = useState([]);
  const [selectedOntologyItem, setSelectedOntologyItem] = useState({});
  const [expandedOntologyItems, setExpandedOntologyItems] = useState({});
  

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
          <MainPage
            ontologyData={ontologyData}
            benchmarkData={benchmarkData}

            setSelectedOntologyItem={(item) => setSelectedOntologyItem(item)}

            selectedOntologyItem={selectedOntologyItem}

            toggleableItems={toggleableItems}
            toggleItem={(item, state) => toggleItem(item, state)}

            expandedOntologyItems={expandedOntologyItems}

          />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
