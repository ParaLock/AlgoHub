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
import useInput from "../hooks/useInput";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

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

const SourceCodeUpload = styled('div')(({ theme }) => ({
    
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "50px"

}));

export default function ImplementationForm(props) {

    const [fileUploadMsg, setFileUploadMsg] = useState("") 
    const [fileContents, setFileContents] = useState("")
    const [error, setError] = useState("")
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [loading, setLoading] = React.useState(false);

    var processFileUpload = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          
            const text = (e.target.result)

            try {

                setFileContents(base64_encode(text))
                setSubmitDisabled(false)
                setError("")

            } catch(e) {

                setFileUploadMsg("Failed to upload file")
                setSubmitDisabled(true)
                setError("Please upload a valid file")
            }
        };

        setFileUploadMsg(e.target.files[0].name)
        reader.readAsText(e.target.files[0])
    }

    var handleSubmit = () => {

        setLoading(true)

        props.onSubmit(
            {}, 
            (err) => {

                setError(err)
                setLoading(false)

            }
        )

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
                    Implementation Form
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <GeneralInfo>
                        <Autocomplete
                        sx={{width: "30%"}}
                        disablePortal
                        required
                        id="combo-box-demo"
                        getOptionLabel={(item) => item.name}
                        options={props.ontologyData.filter((item) => item.typeName == "algorithm")}
                        renderInput={(params) => <TextField {...params} label="Parent Algorithm" />}
                        />
                        <TextField 
                            label="Language"
                            required  
                            sx={{width: "30%"}}
                        />
                    </GeneralInfo>

                    <SourceCodeUpload>
                        <label htmlFor="source_code_upload">
                            <input
                                style={{ display: 'none' }}
                                id="source_code_upload"
                                name="source_code"
                                type="file"
                                onChange={(e) => processFileUpload(e)}
                                
                            />
                            <Button color="primary" variant="contained" component="span">
                                Upload Code
                            </Button>
                            {fileUploadMsg}
                        </label>
                    </SourceCodeUpload>

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