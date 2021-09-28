
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Wrapper = styled.div`

    color: rgba(0, 0, 0, 0.87);
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    background-color: #1976d2;
    color: #fff;

`;

export default function Header(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Wrapper>
      <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={props.onClickOntologyMenu}
          >
            <AccountTreeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AlgoHub
          </Typography>
          <IconButton onClick={props.onClickBenchmarkMenu} color="inherit">
           <AccessTimeIcon/>
          </IconButton>
          <IconButton color="inherit">
           <VisibilityIcon/>
          </IconButton>
          <IconButton color="inherit">
           <VpnKeyIcon/>
          </IconButton>
        </Toolbar>
      </Wrapper>

    </Box>
  );
}

