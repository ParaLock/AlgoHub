import * as React from 'react';
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


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1),
    },
    "& .MuiPaper-root" : {
        height: "100%"
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

const MachineInformation = styled('div')(({ theme }) => ({
    
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "20px"

}));

const ResultsInfomation = styled('div')(({ theme }) => ({
    
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "50px"

}));


export default function BenchmarkForm(props) {

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
                    Benchmark Form
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <GeneralInfo>
                        <Autocomplete
                        sx={{width: "30%"}}
                        disablePortal
                        id="combo-box-demo"
                        getOptionLabel={(item) => item.content}
                        options={props.ontologyData.filter((item) => item.type == "algorithm")}
                        renderInput={(params) => <TextField {...params} label="Parent Algorithm Name" />}
                        />
                        <TextField label="Implementation Name"  
                            sx={{width: "30%"}}
                        />
                        <TextField label="Problem Instance Name"  
                            sx={{width: "30%"}}
                        />
                    </GeneralInfo>

                    <MachineInformation>

                        <Autocomplete
                        sx={{width: "30%"}}
                        disablePortal
                        id="combo-box-demo"
                        getOptionLabel={(item) => item.content}
                        options={[]}
                        renderInput={(params) => <TextField {...params} label="CPU" />}
                        />

                        <Autocomplete
                        sx={{width: "30%"}}
                        disablePortal
                        id="combo-box-demo"
                        getOptionLabel={(item) => item.content}
                        options={[]}
                        renderInput={(params) => <TextField {...params} label="Memory" />}
                        />

                        <Autocomplete
                        sx={{width: "30%"}}
                        disablePortal
                        id="combo-box-demo"
                        getOptionLabel={(item) => item.content}
                        options={[]}
                        renderInput={(params) => <TextField {...params} label="L1 Cache" />}
                        />

                        <Autocomplete
                        sx={{width: "30%"}}
                        disablePortal
                        id="combo-box-demo"
                        getOptionLabel={(item) => item.content}
                        options={[]}
                        renderInput={(params) => <TextField {...params} label="L2 Cache" />}
                        />

                        <Autocomplete
                        sx={{width: "30%"}}
                        disablePortal
                        id="combo-box-demo"
                        getOptionLabel={(item) => item.content}
                        options={[]}
                        renderInput={(params) => <TextField {...params} label="L3 Cache" />}
                        />


                    </MachineInformation>

                    <ResultsInfomation>

                        <TextField label="Execution Time"  
                            sx={{width: "30%"}}
                        />
                        <TextField label="Memory Usage"  
                            sx={{width: "30%"}}
                        />

                    </ResultsInfomation>


                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => props.onClose()}>
                        Create
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}