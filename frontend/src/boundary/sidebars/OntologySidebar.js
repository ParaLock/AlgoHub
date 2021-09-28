
import React, { useState } from 'react';
import styled from 'styled-components';
import OntologyViewer from '../panels/OntologyViewer';
import IconButton from '@mui/material/IconButton';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';

const OntologySidebarWrapper = styled.div`
    user-select: none;
    width: 20%;
    height: 100%;
    background-color: #f0f0f0;
    max-width: ${props => props.open ? "25%" : "0%"};
    transform: ${props => props.open ? "translateX(0%)" : "translateX(-100%)"};
    transition: transform 250ms ease-in-out, max-width 250ms;
    overflow:hidden;
    border-radius: 0px 10px 10px 5px;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    margin-top: 3px;

`;

  
const ontologyData = [

    { id: 1, content: "Algorithms", parentId: 0},
    { id: 2, content: "Sorting", parentId: 1},
    { id: 3, content: "Computational Geometry", parentId: 1},
    { id: 4, content: "Nearest Neighbor", parentId: 3},
    { id: 5, content: "Convex Hull", parentId: 3},
    { id: 6, content: "Graph Algorithms", parentId: 1},
    { id: 7, content: "Search", parentId: 6},
    { id: 8, content: "Breadth-First Search", parentId: 7},
    { id: 9, content: "Depth-First Search", parentId: 7},
    { id: 10, content: "C++", parentId: 9},
    { id: 11, content: "Java", parentId: 9}

]

export default function OntologySidebar(props) {

    const [selected, setSelected] = useState("");

    return (

        <OntologySidebarWrapper open={props.open}>
            <IconButton color="inherit" size="large">
                <AddCircleOutlineIcon />
            </IconButton>
            <IconButton color="inherit" size="large">
                <EditTwoToneIcon />
            </IconButton>
            <IconButton color="inherit" size="large">
                <FindInPageRoundedIcon />
            </IconButton>
            <OntologyViewer 
                            onSelect={(item)=> { setSelected(item)}} 
                            selected={selected} 
                            ontologyData={ontologyData}
            />
        </OntologySidebarWrapper>
    )
}