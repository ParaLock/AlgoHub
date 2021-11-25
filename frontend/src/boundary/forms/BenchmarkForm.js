import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { Form, useForm } from '../hooks/useForm';
import Input from "./Input";
import ListInput from "./ListInput";
import { isNumeric,powerOfTwo,validateStr, validateNum } from '../common/Common';
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

const initialFValues = {
    name: "",
    parentImplementation: null,
    parentProblemInstance: null,
    cpuName: "",
    cpuCores: null,
    cpuThreads: null,
    memory: null,
    l1Cache: null,
    l2Cache: null,
    l3Cache: null,
    execTime: null,
    memUsage: null
}

export default function BenchmarkForm(props) {

    const [loading, setLoading] = React.useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [requestError, setRequestError] = useState("");

    const validate = (fieldValues = values) => {

        let temp = { ...errors }

        validateStr(fieldValues, temp, "name", 100)
        validateStr(fieldValues, temp, "parentImplementation")
        validateStr(fieldValues, temp, "cpuName")
        validateStr(fieldValues, temp, "cpuName")
        validateNum(fieldValues, temp, "cpuCores")
        validateNum(fieldValues, temp, "cpuThreads")
        validateNum(fieldValues, temp, "memory")
        validateNum(fieldValues, temp, "l1Cache")
        validateNum(fieldValues, temp, "l2Cache")
        validateNum(fieldValues, temp, "l3Cache")
        validateNum(fieldValues, temp, "execTime")
        validateNum(fieldValues, temp, "memUsage")

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {

            setLoading(true)
            setSubmitDisabled(true)
            setRequestError("")

            console.log(values)



            // props.requestService.executeAddRequest(
            //     (err) => {
            //         setRequestError(err)
            //         setLoading(false)
            //         setSubmitDisabled(false)

            //         if (err.length == 0) {

            //             props.onClose()
            //         }

            //     },
            //     {
            //         parentId: (values.id) ? values.id.id : null,
            //         name: values.name
            //     },
            //     "classifications",
            //     "add");
        }
    }

    const implementationOptions = useSelector(state => (state.model.ontologyHierarchy || []).filter((item) => item.typeName == "implementation"));
    console.log(implementationOptions)
    var algorithms = useSelector(state => (state.model.ontologyHierarchy || []).filter((item) => item.typeName == "algorithm"));
    var problemInstanceOptions = [];

    if(values.parentImplementation) {
        
        // if(parentAlgorithm.length > 0) {
        //     //TODO: Get algorithm problem instances...
        // }
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
                    Benchmark Form
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <GeneralInfo>
                        <ListInput

                            label="Parent Implementation"
                            name="parentImplementation"
                            value={values.parentImplementation}
                            sx={{width: "50%", marginRight: "50px" }}
                            options={implementationOptions}
                            error={errors.parentImplementation}
                            onChange={handleInputChange}

                        />
                        <ListInput

                            label="Problem Instance"
                            name="parentProblemInstance"
                            value={values.parentProblemInstance}
                            sx={{width: "50%", marginRight: "50px" }}
                            options={problemInstanceOptions}
                            error={errors.parentProblemInstance}
                            onChange={handleInputChange}

                        />
                        <Input
                            label="Name"
                            name="name"
                            value={values.name}
                            error={errors.name}
                            sx={{ width: "50%"}}
                            onChange={handleInputChange}
                        />
                    </GeneralInfo>

                    <MachineInformation>

                        <Input
                            label="CPU Name"
                            name="cpuName"
                            value={values.cpuName}
                            error={errors.cpuName}
                            sx={{width: "30%"}}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="CPU Cores"
                            name="cpuCores"
                            value={values.cpuCores}
                            error={errors.cpuCores}
                            sx={{width: "30%"}}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="CPU Threads"
                            name="cpuThreads"
                            value={values.cpuThreads}
                            error={errors.cpuThreads}
                            sx={{width: "30%"}}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="Memory"
                            name="memory"
                            value={values.memory}
                            error={errors.memory}
                            sx={{width: "30%"}}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="L1 Cache"
                            name="l1Cache"
                            value={values.l1Cache}
                            error={errors.l1Cache}
                            sx={{width: "30%"}}
                            onChange={handleInputChange}
                        />
                        <Input
                            label="L2 Cache"
                            name="l2Cache"
                            value={values.l2Cache}
                            error={errors.l2Cache}
                            sx={{width: "30%"}}
                            onChange={handleInputChange}
                        />
                        <Input
                            label="L3 Cache"
                            name="l3Cache"
                            value={values.l3Cache}
                            error={errors.l3Cache}
                            sx={{width: "30%"}}
                            onChange={handleInputChange}
                        />

                    </MachineInformation>

                    <ResultsInfomation>

                        <Input
                            label="Execution Time"
                            name="execTime"
                            value={values.execTime}
                            error={errors.execTime}
                            sx={{width: "30%"}}
                            onChange={handleInputChange}
                        />
                        <Input
                            label="Memory Usage"
                            name="memUsage"
                            value={values.memUsage}
                            error={errors.memUsage}
                            sx={{width: "30%"}}
                            onChange={handleInputChange}
                        />

                    </ResultsInfomation>


                </DialogContent>
                <font color="red">{requestError.length > 0 && requestError}</font>
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