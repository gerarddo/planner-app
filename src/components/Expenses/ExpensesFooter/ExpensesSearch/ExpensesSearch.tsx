import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';


export default function ExpensesSearch() {
    return (
        <TextField
            id="input-with-icon-textfield"
            // label="TextField"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
            }}
            variant="standard"
        />
    )
}



