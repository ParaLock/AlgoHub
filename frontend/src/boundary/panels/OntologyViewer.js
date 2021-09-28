import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import Tree from 'react-animated-tree'


const treeStyles = {

    color: 'black',
    fill: 'black',
    fontSize: "15pt",
    width: '100%',
    marginLeft: "15px"
  }
  
  const typeStyles = {
    fontSize: '2em',
    verticalAlign: 'middle'
  }
  

export default function OntologyViewer(props) {
    return (
        <div>

            <Tree content="Algorithms" open style={treeStyles} >
                <Tree content="Sorting" style={{ color: '#6652ff' }}/>
                <Tree content="Computational Geometry" style={{ color: '#6652ff' }}>

                    <Tree content="Nearest Neighbor" style={{ color: 'black' }}/>
                    <Tree content="Convex Hull" style={{ color: 'black' }} />

                </Tree>

                <Tree content="Graph Algorithms" style={{ color: '#6652ff' }}>

                    <Tree content="Search" style={{ color: '#6652ff' }}>
                        
                        <Tree content="Breadth-First Search" style={{ color: '#6652ff' }}/>
                        <Tree content="Depth-First Search" style={{ color: '#6652ff' }}>
                            <Tree content="C++" style={{ color: 'black' }}/>
                            <Tree content="Java" style={{ color: 'black' }}/>
                            
                        </Tree>


                    </Tree>

                    <Tree content="Single-source, Shortest Path" style={{ color: '#6652ff' }}>

                    </Tree>

                    <Tree content="All-pairs, Shortest Path" style={{ color: '#6652ff' }}>

                    </Tree>

                </Tree>
                
            </Tree>
        </div>
    );
}
