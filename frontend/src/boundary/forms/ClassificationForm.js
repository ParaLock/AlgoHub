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
import useError from "../hooks/useError";

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

export default function ClassificationForm(props) {

    const [loading, setLoading] = React.useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [error, setError] = useState("");

    const [parentClassificationId, setParentClassificationId] = useState("");
    const [parentClassification, setParentClassification] = useState(null);
    const classificationName = useInput("");

    const [parentClassificationIdError, setParentClassificationIdError] = useState("");
    const [classificationNameError, setClassificationNameError] = useState("");

    var handleSubmit = () => {

        setLoading(true)

        var errors = false

        if(classificationName.value.length == 0) {

            setClassificationNameError("Provide classification name.")
            errors = true;
        }

        if(parentClassificationId.length == 0) {

            setParentClassificationIdError("Provide specify parent classification.")
            errors = true;
        }

        if(errors) {

            setLoading(false)
        }
        
        if(!errors) {

            props.onSubmit(
                {
                    parentClassificationId: parentClassificationId,
                    classificationName: classificationName.value
                }, 
                (err) => {

                    setError(err)
                    setLoading(false)

                    if(err.length == 0) {

                        props.onClose()
                    }

                }
            )
        }

    }

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
                    Classification Form
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <GeneralInfo>
                        <Autocomplete
                            sx={{width: "30%"}}
                            id="combo-box-demo"
                            getOptionLabel={(item) => item.name}
                            options={props.ontologyData.filter((item) => item.typeName == "classification")}
                            renderInput={(params) => <TextField 
                                {...params} 
                                label="Parent Classification" 
                                
                                helperText={parentClassificationIdError}
                                error={parentClassificationIdError.length > 0}
                                onKeyUp={() => setParentClassificationIdError("")}
                            
                            />}
                            onChange={(e, data) => {

                                setParentClassificationIdError("")
                                setParentClassification(data)
                                if(data)
                                    setParentClassificationId(data.id)
                                else
                                    setParentClassificationId("")
                            }}
                            value={parentClassification}
                        />
                        <TextField label="Classification Name"  
                            sx={{width: "30%"}}
                            {...classificationName}
                            helperText={classificationNameError}
                            error={classificationNameError.length > 0}
                            onKeyUp={() => setClassificationNameError("")}
                        />
                    </GeneralInfo>


                </DialogContent>
                <font color="red">{ error.length > 0 && error}</font>
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