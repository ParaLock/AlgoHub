
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import UserList from '../sidebars/UserList';
import Typography from '@mui/material/Typography';
import { useSelector,useDispatch } from 'react-redux';
import BasicHeader from '../BasicHeader';
import GenericListItem from '../common/GenericListItem';
import { enqueueNotification, updateNotificationStatus, updateLoadingStatus, updateRemoveRequest } from "../../model/ViewModel";

var allUsers = [
    "John smith",
    "Jane",
    "Jen",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",

    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",
    "John smith",

    "John smith",
    "John smith"

]

const Wrapper = styled.div`
      
    display: flex;
    width: 100%;
    height: 99%;
    flex-direction: column;
`;

const ContentWrapper = styled.div`

    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    min-height: 0; 

`;

const InnerContentWrapper = styled.div`

    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: stretch;
    padding: 10px;
    padding-bottom: 0px;
    padding-top: 0px;
`;

const ObjectList = styled.div`

    user-select: none;
    display: flex;
    margin-right: 3px;
    margin-left: 3px;
    width: 100%;
    height: 100%;
    background-color: white;
    transition: transform 250ms ease-in-out, max-width 250ms;
    border-radius: 0px 10px 10px 5px;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    margin-top: 3px;
    overflow-y: ${props => props.scrollEnabled ? "auto" : "hidden"};
    flex-direction: column;
    overflow-x: hidden;
`;


export default function AccountManagementPage(props) {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.model.currentUser);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [userActivity, setUserActivity] = useState({
        "classifications": {
            title: "Classifications",
            items: [
                {
                    id: "test1",
                    name: "test1",
                    typeName: "classification"
                }
            ]
        },
        "implementations": {
            title: "Implementations",
            items: [
                {
                    id: "abc123",
                    name: "abc123",
                    typeName: "implementation"
                }
            ]

        },
        "algorithms": {
            title: "Algorithms",
            items: [
                {
                    id: "111",
                    name: "111",
                    typeName: "algorithm"
                }
            ]
        },
        "problem_instances": {
            title: "Problem Instances",
            items: [
                {
                    id: "222",
                    name: "222",
                    typeName: "problem_instance"
                }
            ]
        }
    });

    var removeUser = (user) => {
        console.log(user)
        dispatch(updateRemoveRequest(
            {
                msg: "Are you sure you want to remove the user " + user + "? Doing so will delete all objects created by said user.",
                item: {
                    id: user,
                    typeName: "user"
                }
            }
        ))

    }

    var removeItem = (item) => {
        console.log(item)
        dispatch(updateRemoveRequest(
            {
                msg: "Are you sure you want to remove " + item.typeName + "?",
                item: item
            }
        ))
    }

    var selectUser = (user) => {
        console.log(user);
        setSelectedUser(user)
    }

    React.useEffect(() => {

        if(currentUser && currentUser.groups.includes("admins")) {

            setUsers(allUsers);
        }

        if(currentUser && !currentUser.groups.includes("admins")) {

            setUsers([currentUser.username]);
            setSelectedUser(currentUser.username)
        }

    }, []);

    return (

        <Wrapper>
            <BasicHeader title="Account Management" />
            <ContentWrapper>
                <UserList 
                    users={users} 
                    onSelected={(item) => selectUser(item)} 
                    onRemove={removeUser}
                    selectedUser={selectedUser}
                    enableRemove={currentUser && currentUser.groups.includes("admins")}
                />
                <InnerContentWrapper>
                    {
                        Object.keys(userActivity).map((key) => {

                            var item = userActivity[key];

                            return <ObjectList>
                                <Typography variant="h6" align="center" component="div" gutterBottom>
                                    {item.title}
                                </Typography>
                                {
                                    item.items.map((listItem)=> {
                                        return <GenericListItem
                                            onSelected={(item) => {}} 
                                            onRemove={removeItem}
                                            title={listItem.name}
                                            item={listItem}
                                            enableRemove={currentUser}
                                        />
                                    })
                                }
                            </ObjectList>

                        })

                    }
                </InnerContentWrapper>
            </ContentWrapper>
        </Wrapper>
    );
}

