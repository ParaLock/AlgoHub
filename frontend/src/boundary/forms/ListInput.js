//Credit: https://github.com/CodAffection/Material-UI-Form-Design-and-Validation/blob/master/src/components/controls/Input.js

import React from 'react'
import { TextField } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
export default function ListInput(props) {

    const { name, options, label, item, value, error = null, onChange, onChangeItem } = props;
    return (
        <Autocomplete
            sx={{ width: "30%" }}
            disablePortal
            id="combo-box-demo"
            getOptionLabel={(item) => item.name}
            options={options}
            renderInput={(params) => <TextField
                {...params}
                name={name}
                value={value}
                onChange={onChange}
                {...(error && {error:true,helperText:error})}

            />
            }
            onChange={onChangeItem}
            value={item}


        />
    )
}