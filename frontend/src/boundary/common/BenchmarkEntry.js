
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Wrapper = styled.div`

    border-radius: 25px;
    margin: 5px;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding: 5px;
  
    
    `;

const InputSize = styled.div`

    border-radius: 25px;
    margin: 5px;
    text-align: left;
    
`;

const MachineInfo = styled.div`

    border-radius: 25px;
    margin: 5px;
    text-align: left;
  
`;

const Results = styled.div`

    border-radius: 25px;
    margin: 5px;
    text-align: left;
    
`;

const ContentWrapper = styled.div`

    display: flex;
    justify-content: space-between;

`;


export default function BenchmarkEntry(props) {
  return (

      <Wrapper>
          <ContentWrapper>

            <InputSize>
                        <i>Input Size</i>: {props.benchmark.inputSize} 
                        <br/>
                        <i>Problem Instance</i>: {props.benchmark.problemInstance}</InputSize>
            <IconButton color="inherit" size="small">
                <HighlightOffIcon />
            </IconButton>
          </ContentWrapper>
          <MachineInfo>
            <h4>Machine Information</h4>
            <i>CPU</i>: {props.benchmark.machine.CPU}
            <br/>
            <i>L1</i>: {props.benchmark.machine.L1}
            <br/>
            <i>L2</i>: {props.benchmark.machine.L2}
            <br/>
            <i>L3</i>: {props.benchmark.machine.L3}
            <br/>
            <i>Memory</i>: {props.benchmark.machine.Memory}
          </MachineInfo>
          <Results>
            <h4>Results</h4>
            <i>Memory Usage: </i>: {props.benchmark.memoryUsage}
            <br/>
            <i>Execution Time: </i>: {props.benchmark.executionTime}
          </Results>
      </Wrapper>
  );
}

