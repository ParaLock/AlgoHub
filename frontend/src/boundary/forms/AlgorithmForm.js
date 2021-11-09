import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LoadingButton from '@mui/lab/LoadingButton';

import useInput from "../hooks/useInput";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1),
    },
    "& .MuiPaper-root" : {
        height: "fit-content"
    }
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};


const FieldWrapper = styled('div')(({ theme }) => ({
    
    marginBottom: '50px'
}));

const GeneralInfo = styled('div')(({ theme }) => ({
    
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "50px"

}));

export default function AlgorithmForm(props) {

    const [parentClassification, setParentClassification] = useState(null);
    const algorithmName = useInput("");
    const algorithmDescription = useInput("");
    const [loading, setLoading] = React.useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [requestError, setRequestError] = useState("");
    const [algorithmDescriptionError, setAlgorithmDescriptionError] = useState("");
    const [algorithmNameError, setAlgorithmNameError] = useState("");
    const [parentClassificationIdError, setParentClassificationIdError] = useState("");

    const [parentClassificationId, setParentClassificationId] = useState("");

    var handleSubmit = () => {

        setLoading(true)

        var errors = false;

        if(algorithmDescription.value.length == 0) {

            setAlgorithmDescriptionError("Please provide algorithm description.");
            errors = true;
        }

        if(algorithmName.value.length == 0) {

            setAlgorithmNameError("Please provide algorithm name.");
            errors = true;
        }

        if(parentClassificationId.length == 0) {
            setParentClassificationIdError("Please provide algorithm classification.");
            errors = true;
        }

        if(errors) {

            setLoading(false)
        }
        
        if(!errors) {

            props.onSubmit(
                {
                    parentClassificationId: parentClassificationId,
                    algorithmName: algorithmName.value,
                    algorithmDescription: algorithmDescription.value
                }, 
                (err) => {

                    setRequestError(err)
                    setLoading(false)

                    if(err.length == 0) {

                        props.onClose()
                    }

                }
            )
        }

    }

    var classificationOptions = (props.ontologyData) ? props.ontologyData.filter((item) => item.typeName == "classification") : [];

    return (
        <div>
            <BootstrapDialog
                onClose={() => props.onClose()}
                aria-labelledby="customized-dialog-title"
                open={props.open}
                maxWidth="xl"
                fullWidth="true"
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => props.onClose()}>
                    Algorithm Form
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <GeneralInfo>
                        <Autocomplete
                            sx={{width: "30%"}}
                            disablePortal
                            id="combo-box-demo"
                            getOptionLabel={(item) => item.name}
                            options={classificationOptions}
                            renderInput={(params) => <TextField 
                                                                {...params} 
                                                                label="Parent Classification" 
                                                                onKeyUp={() => setParentClassificationIdError("")}
                                                                helperText={parentClassificationIdError}
                                                                error={parentClassificationIdError.length > 0}

                                                    />
                                        }
                            onChange={(e, item) => {
                                                        setParentClassificationIdError("")
                                                        if(item)
                                                            setParentClassificationId(item.id);
                                                        else
                                                            setParentClassificationId("")
                                                        setParentClassification(item);
                                                    }}
                            value={parentClassification}
      
                            
                        />
                        <TextField label="Algorithm Name"  
                            sx={{width: "30%"}}
                            {...algorithmName}
                            helperText={algorithmNameError}
                            error={algorithmNameError.length > 0}
                            onKeyUp={() => setAlgorithmNameError("")}

                        />
         
                    </GeneralInfo>
                    <TextField
                            placeholder="Please enter algorithm description"
                            multiline
                            rows={4}
                            rowsMax={4}
                            sx={{width: "30%"}}
                            {...algorithmDescription}
                            helperText={algorithmDescriptionError}
                            error={algorithmDescriptionError.length > 0}
                            onKeyUp={() => setAlgorithmDescriptionError("")}
                        />

                </DialogContent>
                <font color="red">{ requestError.length > 0 && requestError}</font>
                <DialogActions>

                    <LoadingButton
                        onClick={handleSubmit}
                        loading={loading}
                        disabled={submitDisabled}
                        loadingPosition="center"
                        variant="contained"
                    >
                        Create
                    </LoadingButton>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}