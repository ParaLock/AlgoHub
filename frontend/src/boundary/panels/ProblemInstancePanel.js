
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';


const Wrapper = styled.div`

    height: 47.5%;
    border-radius: 25px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin: 5px;
    padding: 5px;
    justify-content: center;
    flex-direction: column;
    overflow: scroll;
    overflow-y: auto;
    text-align: center;
`;

const Title = styled.div`

    font-size: 25pt;
    margin-bottom: 10px;
`;

const ProblemInstanceWrapper = styled.div`
    border-radius: 25px;
    height: 300px;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin-top: 20px;
`;

export default function ProblemInstancePanel(props) {
    return (
  
        <Wrapper>
            <Title>Problem Instances</Title>
            <ProblemInstanceWrapper>
                Problem instance 1
            </ProblemInstanceWrapper>
            <ProblemInstanceWrapper>
                Problem instance 2
            </ProblemInstanceWrapper>
            <ProblemInstanceWrapper>
                Problem instance 3
            </ProblemInstanceWrapper>
            <ProblemInstanceWrapper>
                Problem instance 4
            </ProblemInstanceWrapper>
            <ProblemInstanceWrapper>
                Problem instance 4
            </ProblemInstanceWrapper>
            <ProblemInstanceWrapper>
                Problem instance 4
            </ProblemInstanceWrapper>
            <ProblemInstanceWrapper>
                Problem instance 4
            </ProblemInstanceWrapper>
            <ProblemInstanceWrapper>
                Problem instance 4
            </ProblemInstanceWrapper>
            <ProblemInstanceWrapper>
                Problem instance 4
            </ProblemInstanceWrapper>
            <ProblemInstanceWrapper>
                Problem instance 4
            </ProblemInstanceWrapper>
            <ProblemInstanceWrapper>
                Problem instance 4
            </ProblemInstanceWrapper>

            <ProblemInstanceWrapper>
                Problem instance 4
            </ProblemInstanceWrapper>
        </Wrapper>
    );
  }
  
  