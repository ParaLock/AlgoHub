
import * as React from 'react';
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
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { styled as material_styled} from '@mui/material/styles';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

import { useHistory } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';


const Wrapper = styled.div`

    color: rgba(0, 0, 0, 0.87);
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    background-color: #1976d2;
    color: #fff;

`;

const CustomToolbar = material_styled(Toolbar)(({ theme }) => ({

}));


export default function Header(props) {

  const history = useHistory();

  return (
      <Wrapper>
      <CustomToolbar variant="dense">

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AlgoHub 
            {props.currentUser && " - " + props.currentUser.username} 
            {props.currentUser && props.currentUser.groups.length > 0 && "(" + props.currentUser.groups.join(",") + ")"}
          </Typography>
          <IconButton onClick={props.onClickBenchmarkMenu} color="inherit">
           <AccessTimeIcon/>
          </IconButton>
          { props.currentUser && 
            <IconButton onClick={() => history.push('/accounts')} color="inherit">
            <VisibilityIcon/>
            </IconButton>
          }

          { !props.currentUser && 
              <IconButton onClick={() => props.onLogin()}  color="inherit">
                <LoginIcon/>
              </IconButton>
          }

          { props.currentUser && 
              <IconButton onClick={() => props.onLogout()}  color="inherit">
                <LogoutIcon/>
              </IconButton>
          }

          
          
        </CustomToolbar>
      </Wrapper>

  );
}

