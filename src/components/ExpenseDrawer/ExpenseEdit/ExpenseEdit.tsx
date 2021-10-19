import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';

import { Box, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import CancelEditExpenseButton from './CancelExpenseEditButton/CancelExpenseEditButton'
const useStyles = makeStyles((theme: any) => ({

    infoFieldBox: {
        marginTop: 15,
        marginBottom: 15,
        width: '100%' 
    },
    infoFieldEdit: {
        width: '100%' 
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
      },
  }));

export default function ExpenseEdit(props: any) {

    const classes = useStyles();
    const expense = props.expense
    const flows = props.flows
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
        <Paper className={classes.paper} sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2 }}>
            <Grid container>
                <Grid item sx={{ flexGrow: 1 }}>
                <h4>Edit expense</h4>
                </Grid>
                <Grid item >
                    <CancelEditExpenseButton></CancelEditExpenseButton>
                </Grid>
            </Grid>
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
        </Paper>
    )
}