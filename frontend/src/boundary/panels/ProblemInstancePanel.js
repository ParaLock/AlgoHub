
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSelector, useDispatch } from 'react-redux'
import { Resizable } from "re-resizable";

const Wrapper = styled.div`

    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin: 5px;
    padding: 5px;
    font-size: 10pt;
    margin-bottom: 0px;
    height: 100%;
    flex-direction: column;
    overflow: scroll;
    display:flex;
    flex-grow: 1;
    overflow-y: auto;
`;

const Title = styled.h4`

    margin-bottom: 10px;
    text-align: center;
`;

const ProblemInstanceWrapper = styled.div`
    border-radius: 5px;
    height: 80px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin-top: 10px;
    padding: 10px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
`;

const MsgWrapper = styled.h3`

    text-align: center;
`;

const ButtonWrapper = styled.div`
    justify-content: center;
    display: flex;
`;


export default function ProblemInstancePanel(props) {

    var problemInstances = useSelector(state => state.viewModel.selectedItem["problem_instances"] ?? []);
    var currentUser = useSelector(state => state.model.currentUser);

    return (

        <Wrapper>
            <Typography variant="h6" align="center" component="div" gutterBottom>
            Problem Instances
            </Typography>
            {currentUser && 
                <ButtonWrapper>
                    <IconButton color="inherit" size="large" onClick={() => props.togglePanel("problem_instance_add_form")}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </ButtonWrapper>
            }

            {
                problemInstances.map((item) => {


                    return <ProblemInstanceWrapper>

                        <table>

                            <tr>
                                <td><i>Input Size:</i></td>
                                <td>{item.inputSize}</td>
                            </tr>
                            <tr>
                                <td><i>Name:</i></td>
                                <td>{item.name}</td>
                            </tr>
                            <tr>
                                <td>
                                    <Button size="small"  variant="contained">DOWNLOAD</Button>
                                </td>
                            </tr>
                        </table>
                        <br />

                        {currentUser && 
                        
                            <ButtonWrapper>
                                <IconButton color="inherit" size="small">
                                    <HighlightOffIcon />
                                </IconButton>
                            </ButtonWrapper>
                        }
                    </ProblemInstanceWrapper>
                })
            }

            {problemInstances.length == 0 && <MsgWrapper>None</MsgWrapper>}

        </Wrapper>
    );
}

