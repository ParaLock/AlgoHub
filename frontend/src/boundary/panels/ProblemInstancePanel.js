
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
`;

const Title = styled.h4`

    margin-bottom: 10px;
    text-align: center;
`;

const ProblemInstanceWrapper = styled.div`
    border-radius: 25px;
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
    return (

        <Wrapper>
            <Title>PROBLEM INSTANCES</Title>

            <ButtonWrapper>
                <IconButton color="inherit" size="large" onClick={() => props.onProblemInstanceAdd()}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </ButtonWrapper>

            {
                props.problemInstanceData.map((item) => {


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
                                    <Button variant="contained">DOWNLOAD</Button>
                                </td>
                            </tr>
                        </table>
                        <br />

                        <ButtonWrapper>
                            <IconButton color="inherit" size="small">
                                <HighlightOffIcon />
                            </IconButton>
                        </ButtonWrapper>
                    </ProblemInstanceWrapper>
                })
            }

            {props.problemInstanceData.length == 0 && <MsgWrapper>None</MsgWrapper>}

        </Wrapper>
    );
}

