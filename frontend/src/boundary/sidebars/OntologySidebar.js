
import React, { useState } from 'react';
import styled from 'styled-components';
import OntologyViewer from '../panels/OntologyViewer';
import IconButton from '@mui/material/IconButton';

import { styled as material_styled} from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import StarsIcon from '@mui/icons-material/Stars';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { Resizable } from "re-resizable";
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import OntologyTreeViewer from '../panels/OntologyTreeViewer';
import Switch from '@mui/material/Switch';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useSelector, useDispatch } from 'react-redux'
import { updateOperationStatus,updateLoadingStatus } from "../../model/ViewModel";

const CustomSpeedDial = material_styled(SpeedDial)(({ theme }) => ({
    '& .MuiSpeedDial-actions': {
        zIndex: 9999,
        position: "absolute",
        marginTop: "0.5px"
    }
}));

const OntologySidebarWrapper = styled.div`
    user-select: none;
    height: 100%;
    background-color: #f5f7fa;
    flex-wrap: nowrap;
    max-width: ${props => props.open ? "100%" : "0%"};
    transform: ${props => props.open ? "translateX(0%)" : "translateX(-100%)"};
    transition: transform 250ms ease-in-out, max-width 250ms;
    overflow:hidden;
    border-radius: 0px 10px 10px 5px;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    margin-top: 3px;
    overflow-y: auto;

`;

const ButtonWrapper = styled.div`

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    border-radius: 0px 10px 10px 5px;
    border: 1px solid #1976d2;
`;

const SwitchContainer = styled.div`

    display: inline-block;
    position: absolute;
    right: 0px;
    bottom: 50px;
    z-index: 999999;
`;


export default function OntologySidebar(props) {

    const [showTreeView, setShowTreeView] = useState(false);
    const dispatch = useDispatch();

    const ontologyHierarchy = useSelector(state => state.model.ontologyHierarchy);
    const currentUser = useSelector(state => state.model.currentUser);
    const isOntologyLoading = useSelector(state => state.viewModel.loadingStatus["ontology_loading"])

    React.useEffect(() => {

        if(!ontologyHierarchy) {

            dispatch(updateOperationStatus({
                name: "loading_hierarchy",
                status: "loading_started",
                msg: "Loading Hierarchy...",
                type: "info"
            }))
        
            dispatch(updateLoadingStatus({
                name: "loading_hierarchy",
                state: true
            }))

        } else {

            dispatch(updateOperationStatus({
                name: "loading_hierarchy",
                status: "loading_complete",
                msg: "Loading Hierarchy...",
                type: "info"
            }))

            dispatch(updateLoadingStatus({
                name: "loading_hierarchy",
                state: false
            }))
        }
        
    }, [ontologyHierarchy]);

    return (

        <Resizable
        enable={{ top:false, right:true, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
        defaultSize={{
            width:"20%",
            height:"100%",
        }}
        >
        <OntologySidebarWrapper open={props.open}>
            <ButtonWrapper>
                <span>
                    { currentUser &&
                        <IconButton color="inherit" size="large" onClick={() => props.onOntologyMerge()}>
                            <MergeTypeIcon />
                        </IconButton>
                    }
                    { currentUser &&
                        <IconButton color="inherit" size="large" onClick={() => props.onAlgorithmReclassify()}>
                            <DriveFileMoveIcon />
                        </IconButton>
                    }
                    <IconButton color="inherit" size="large" onClick={() => props.onOntologyReport()}>
                        <StarsIcon />
                    </IconButton>
                    
                </span>
            <span>

            { currentUser &&
            
                <CustomSpeedDial
                    ariaLabel="SpeedDial playground example"
                    direction="down"
                    sx="sm"
                    
                    FabProps={{sx: {width: "40px", height: "10px", marginTop: "2px"}}}
                    icon={<SpeedDialIcon />}
                >
                    <SpeedDialAction
                        key={"action_1"}
                        icon={<CategoryIcon/>}
                        tooltipTitle={"Add Classification"}
                        onClickCapture={() => props.onClassificationAdd()}
                    />
                    <SpeedDialAction
                        key={"action_2"}
                        icon={<FileCopyIcon/>}
                        tooltipTitle={"Add Algorithm"}
                        onClickCapture={() => props.onAlgorithmAdd()}
                    />
                    <SpeedDialAction
                        key={"action_3"}
                        icon={<PlayCircleOutlineIcon/>}
                        tooltipTitle={"Add Implementation"}
                        onClickCapture={() => props.onImplementationAdd()}
                    />
                </CustomSpeedDial>
            
            }

            
            </span>
     
            </ButtonWrapper>
            <SwitchContainer>

                Tree View
                <Switch 
                    onClick={() => setShowTreeView(!showTreeView)}
                />
            </SwitchContainer>
            {isOntologyLoading && <CircularProgress />}
            { showTreeView &&

                <OntologyTreeViewer
                    onSelect={(item)=> { props.ontologyController.selectOntologyItem(item)}} 
                    enableRemove={currentUser}
                />
            }

            { !showTreeView && 
                <OntologyViewer 
                    onSelect={(item)=> { props.ontologyController.selectOntologyItem(item)} } 
                    enableRemove={currentUser}
                />
            }
        </OntologySidebarWrapper></Resizable>
    )
}