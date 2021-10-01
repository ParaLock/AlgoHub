
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

    width: 99.5%;
    height: 10%;
    border-radius: 25px;
    margin: 5px;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

export default function BenchmarkEntry(props) {
  return (

      <Wrapper>
          BENCHMARK INFO
      </Wrapper>
  );
}

