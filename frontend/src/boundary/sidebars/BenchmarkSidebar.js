
import React, { useState } from 'react';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import BenchmarkEntry from '../common/BenchmarkEntry';
import { Resizable } from "re-resizable";

const BenchmarkSidebarWrapper = styled.div`
    user-select: none;
    width: 25%;
    height: 100%;
    background-color: #f2f3f5;
    max-width: ${props => props.open ? "25%" : "0%"};
    transform: ${props => props.open ? "translateX(0%)" : "translateX(100%)"};
    transition: transform 250ms ease-in-out, max-width 250ms;
    overflow:hidden;
    border-radius: 10px 5px 10px 5px;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    margin-top: 3px;
    overflow: scroll;
    overflow-y: auto;
`;

const ButtonWrapper = styled.div`
    justify-content: center;
    display: flex;
    height: 4%;
    border-radius: 0px 10px 10px 5px;
    border: 1px solid #1976d2;
    margin-bottom: 10px;
`;

const MsgWrapper = styled.h3`

    text-align: center;
`;

export default function BenchmarkSidebar(props) {
    
    return (

        <BenchmarkSidebarWrapper open={props.open}>

            <ButtonWrapper>
                <IconButton color="inherit" size="large" onClick={() => props.onBenchmarkAdd()}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </ButtonWrapper>

            {props.benchmarks.length == 0 && <MsgWrapper>No Benchmarks</MsgWrapper>}

            {props.benchmarks.map((item) => { return <BenchmarkEntry benchmark={item}/> })}
             
        </BenchmarkSidebarWrapper>
    )
}