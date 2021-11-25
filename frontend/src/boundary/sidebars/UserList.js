
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import UserEntry from '../common/UserEntry';
import GenericListItem from '../common/GenericListItem';

import Typography from '@mui/material/Typography';
const Wrapper = styled.div`
    user-select: none;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #f5f7fa;
    transition: transform 250ms ease-in-out, max-width 250ms;
    border-radius: 0px 10px 10px 5px;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    margin-top: 3px;
    overflow-y: ${props => props.scrollEnabled ? "auto" : "hidden"};
    overflow-x: hidden;
    width: 20%;

`;

export default function UserList(props) {

    return (

        <Wrapper scrollEnabled={true}>
            <Typography variant="h6" align="center" component="div" gutterBottom>
                Users
            </Typography>
            {
                props.users.map((item) => <GenericListItem 
                                                    onSelected={props.onSelected}
                                                    selected={props.selectedUser == item} 
                                                    title={item} 
                                                    item={item}
                                                    onRemove={props.onRemove}
                                                    enableRemove={props.enableRemove}
                                        />)
            }

        </Wrapper>
    )
}