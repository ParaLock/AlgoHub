//Credit: https://github.com/CodAffection/Material-UI-Form-Design-and-Validation/blob/master/src/components/controls/Input.js

import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { sx, name, label, value,error=null, onChange } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            sx={sx}
            onChange={(e) => {

                const {name, value} = e.target;
                onChange(name, value)
            
            }}
            {...(error && {error:true,helperText:error})}
        />
    )
}