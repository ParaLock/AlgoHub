
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
  
    height: 40%;
    border-radius: 25px;
    border-width: 1px;
    font-size: 25pt;
    margin: 5px;
`;


const AlgorithmDescription = styled.div`
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    height: 90%;
    border-radius: 25px;
    border-width: 1px;
    overflow-wrap: anywhere;
    padding-left: 5px;
    padding-right: 5px;
    margin: 5px;
    margin-bottom: 0px;
    display: flex;
    justify-content: center;
    
`;

export default function AlgorithmPanel(props) {
  return (

      <Wrapper>

          <AlgorithmDescription>Description goes here...</AlgorithmDescription>
          
      </Wrapper>
  );
}

