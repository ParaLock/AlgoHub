
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
  
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    height: 47.5%;
    border-radius: 25px;
    border-width: 1px;
    overflow-wrap: anywhere;
    padding-left: 5px;
    padding-right: 5px;
    margin: 5px;
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
`;


const ImplCode = styled.div`

    border-radius: 25px;
    border-width: 1px;
    overflow-wrap: anywhere;
    padding-left: 5px;
    padding-right: 5px;
    margin: 5px;
    margin-bottom: 0px;
    display: flex;
    height: 90%;
    margin-bottom: 1%;
    justify-content: center;
    
`;

const ButtonWrapper = styled.div`

    margin-left: 90%;
    padding-bottom: 10px;

`;

export default function ImplementationPanel(props) {
  return (

      <Wrapper>

            <ImplCode>
                Code goes here

            </ImplCode>
            
            <ButtonWrapper>

            <Button variant="contained">DOWNLOAD</Button>
            </ButtonWrapper>

          

      </Wrapper>
  );
}

