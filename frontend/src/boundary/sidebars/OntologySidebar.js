
import React, { useState } from 'react';
import styled from 'styled-components';
import OntologyViewer from '../panels/OntologyViewer';
import IconButton from '@mui/material/IconButton';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import StarsIcon from '@mui/icons-material/Stars';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { Resizable } from "re-resizable";


const OntologySidebarWrapper = styled.div`
    user-select: none;
    height: 100%;
    background-color: #f0f0f0;
    flex-wrap: nowrap;
    max-width: ${props => props.open ? "100%" : "0%"};
    transform: ${props => props.open ? "translateX(0%)" : "translateX(-100%)"};
    transition: transform 250ms ease-in-out, max-width 250ms;
    overflow:hidden;
    border-radius: 0px 10px 10px 5px;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    margin-top: 3px;

`;

const ButtonWrapper = styled.div`
    justify-content: right;
    display: flex;
    height: 4%;
    border-radius: 0px 10px 10px 5px;
    border: 1px solid #1976d2;
    margin-bottom: 10px;
`;

const AddButtonContainer = styled.div`
    justify-content: right;
    display: flex;
    width: 99%;
    height: 4%;
    padding-top: 8px;
    padding-right: 8px;
    
    margin-bottom: 10px;
`;

export default function OntologySidebar(props) {

    return (

        <Resizable
        enable={{ top:false, right:true, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
        defaultSize={{
            width:"20%",
            height:"100%",
        }}
        >
        <OntologySidebarWrapper open={props.open}>

            <ButtonWrapper>
                <IconButton color="inherit" size="large" onClick={() => props.onOntologyMerge()}>
                    <MergeTypeIcon />
                </IconButton>
                <IconButton color="inherit" size="large" onClick={() => props.onAlgorithmReclassify()}>
                    <DriveFileMoveIcon />
                </IconButton>
                <IconButton color="inherit" size="large" onClick={() => props.onOntologyReport()}>
                    <StarsIcon />
                </IconButton>
            <AddButtonContainer>
            <SpeedDial
                    ariaLabel="SpeedDial playground example"
                    direction="down"
                    sx="sm"
                    FabProps={{sx: {width: "40px"}}}
                    icon={<SpeedDialIcon />}
                >
                    <SpeedDialAction
                        key={"action_1"}
                        icon={<CategoryIcon/>}
                        tooltipTitle={"Add Classification"}
                        onClickCapture={() => props.onClassificationAdd()}
                    />
                    <SpeedDialAction
                        key={"action_2"}
                        icon={<FileCopyIcon/>}
                        tooltipTitle={"Add Algorithm"}
                        onClickCapture={() => props.onAlgorithmAdd()}
                    />
                    <SpeedDialAction
                        key={"action_3"}
                        icon={<PlayCircleOutlineIcon/>}
                        tooltipTitle={"Add Implementation"}
                        onClickCapture={() => props.onImplementationAdd()}
                    />
                </SpeedDial>
            </AddButtonContainer>



            </ButtonWrapper>
            <OntologyViewer 
                        onSelect={(item)=> { props.onOntologyItemSelected(item)}} 
                        selected={props.selectedOntologyItem} 
                        ontologyData={props.ontologyData}
                        expandedOntologyItems={props.expandedOntologyItems}
            />
        </OntologySidebarWrapper></Resizable>
    )
}