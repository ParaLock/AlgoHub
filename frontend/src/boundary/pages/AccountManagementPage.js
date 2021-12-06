
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
import { useSelector, useDispatch } from 'react-redux';
import BasicHeader from '../BasicHeader';
import GenericListItem from '../common/GenericListItem';
import { enqueueNotification, updateNotificationStatus, updateLoadingStatus, updateRemoveRequest } from "../../model/ViewModel";
import CircularProgress from '@mui/material/CircularProgress';

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
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [userActivity, setUserActivity] = useState(null);

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

    var updateUserActivity = (data) => {

        var activity = {};

        setUserActivity(null);

        for(var i in data) {

            var act = data[i];

            console.log(act)
            if(!(act.typeName in Object.keys(activity))) {
                activity[act.typeName] = {title: act.typeName + "s", items: []}
            }
            activity[act.typeName].items.push(act);
        }

        console.log(activity)

        setUserActivity(activity)

    }

    var selectUser = (user) => {
        console.log(user);

        props.requestService.executePostRequest(
            (err, data) => {

                if (err.length == 0) {
                    updateUserActivity(data.activity)
                }

            },
            {
                username: selectedUser
            },
            "users/activity",
            "",
            ""
        );
        

        setSelectedUser(user)
    }

    React.useEffect(() => {

        if (currentUser && currentUser.groups.includes("admins")) {

            setLoadingUsers(true)

            props.requestService.executeGetRequest((err, res) => {

                console.log(err)
                console.log(res)

                if (err.length == 0) {

                    setLoadingUsers(false)
                    setUsers(res.users);

                }
            }, "users/all_registered");
        }

        if (currentUser && !currentUser.groups.includes("admins")) {

            setUsers([currentUser.username]);
            selectUser(currentUser.username)
        }


    }, []);

    return (

        <Wrapper>
            <BasicHeader title="Account Management" />
            <ContentWrapper>
                <UserList
                    isLoading={loadingUsers}
                    users={users}
                    onSelected={(item) => selectUser(item)}
                    onRemove={removeUser}
                    selectedUser={selectedUser}
                    currentUser={currentUser}
                    enableRemove={currentUser && currentUser.groups.includes("admins")}
                />
                <InnerContentWrapper>
                    {
                        userActivity && Object.keys(userActivity).map((key) => {

                            var item = userActivity[key];

                            return <ObjectList>
                                <Typography variant="h6" align="center" component="div" gutterBottom>
                                    {item.title}
                                </Typography>
                                {
                                    item.items.map((listItem) => {
                                        return <GenericListItem
                                            onSelected={(item) => { }}
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

