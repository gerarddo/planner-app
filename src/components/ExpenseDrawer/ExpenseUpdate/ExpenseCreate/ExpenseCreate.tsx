import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';

import { Box, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { IEntry, IExpense } from '../../../../api';

const useStyles = makeStyles((theme: any) => ({
    infoFieldBox: {
        marginTop: 15,
        marginBottom: 15,
        width: '100%' 
    },
    infoFieldEdit: {
        width: '100%' 
    }
  }));

export default function ExpenseCreate(props: any) {

    const classes = useStyles();
    const expense: IExpense = {
        id: '',
        ymd: '',
        tags: [],
        description: '',
        method: '',
        inflow: 0,
        outflow: 0
    }
    const flows = 0
    const [date, setDate] = React.useState('');

    const methodOptions = [
        {
            'value':'debit',
            'label':'debit'
        },
        {
            'value':'credit',
            'label':'credit'
        }
    ]

    return (
        <Box >
            <Box className={classes.infoFieldBox}>
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                        value={expense.ymd}
                        
                        onChange={(newValue: any) => {
                            setDate(newValue);
                        }}
                        renderInput={(params: any) => <TextField {...params} className={classes.infoFieldEdit}/>}
                    />
                </LocalizationProvider>
            </Box>
            <Box className={classes.infoFieldBox}>
                <TextField className={classes.infoFieldEdit} id="outlined-basic" label="Outlined" variant="outlined" value={expense.description}/>
            </Box>
            <Box className={classes.infoFieldBox}>
                <TextField
                    className={classes.infoFieldEdit}
                    id="outlined-select-currency"
                    select
                    label="Select"
                    value={expense.method}
                    //   onChange={handleChange}
                >
                    {methodOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box >
            <Box className={classes.infoFieldBox}>
                <TextField className={classes.infoFieldEdit} id="outlined-basic" label="Amount" variant="outlined" value={flows} />
            </Box>
        </Box>
    )
}