import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';

import { Box, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { IEntry } from '../../../../api';
import SubmitEntryCreateButton from './SubmitEntryCreateButton/SubmitEntryCreateButton'
import EntriesUpdateContext  from '../../../../store/entries-update-context';

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


let getToday = () => {
    let pad2 = (n: any) => {return (n < 10 ? '0' : '') + n};
    let today = new Date(),
        month = pad2(today.getMonth()+1),//months (0-11)
        day   = pad2(today.getDate()), //day (1-31)
        year  = today.getFullYear();        
    return year+"-"+month+"-"+day;
}

export default function EntryCreate(props: any) {

    const today = getToday()    
    const classes = useStyles();
    const updateCtx = useContext(EntriesUpdateContext);

    const entry: IEntry = {
        id: '',
        ymd: today,
        tags: [],
        description: '',
        method: '',
        inflow: 0,
        outflow: 0
    }

    const [date, setDate] = React.useState(entry.ymd);
    const [description, setDescription] = React.useState(entry.description);
    const [method, setMethod] = React.useState(entry.method);
    const [inflows, setInflows] = React.useState(entry.inflow);
    const [outflows, setOutflows] = React.useState(entry.outflow);

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


    const saveInContext = () => {
        let current = updateCtx.current
        current.ymd = date
        current.description = description
        current.method = method
        current.inflow = inflows
        current.outflow = outflows
        updateCtx.updateCurrent(current)
    }

    const handleSaveDate = (val: any) => {  setDate(val); saveInContext();}
    const handleSaveDescription = (ev: any) => {  setDescription(ev.target.value); saveInContext();}
    const handleSaveMethod = (ev: any) => {  setMethod(ev.target.value); saveInContext();}
    const handleSaveInflows = (ev: any) => {  setInflows(parseInt(ev.target.value)); saveInContext();}
    const handleSaveOutflows = (ev: any) => {  setOutflows(parseInt(ev.target.value)); saveInContext();}

    return (
        <Box >
            <Box className={classes.infoFieldBox}>
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                        value={date}
                        onChange={handleSaveDate}
                        renderInput={(params: any) => <TextField {...params} className={classes.infoFieldEdit}/>}
                    />
                </LocalizationProvider>
            </Box>
            <Box className={classes.infoFieldBox}>
                <TextField 
                    className={classes.infoFieldEdit} 
                    id="outlined-basic" 
                    label="Description" 
                    variant="outlined" 
                    value={description}
                    onChange={handleSaveDescription}
                    />
            </Box>
            <Box className={classes.infoFieldBox}>
                <TextField
                    className={classes.infoFieldEdit}
                    id="outlined-select-currency"
                    select
                    label="Payment method"
                    value={method}
                    onChange={handleSaveMethod}
                >
                    {methodOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box >
            <Box className={classes.infoFieldBox}>
                <TextField 
                    className={classes.infoFieldEdit} 
                    id="outlined-basic" 
                    label="Inflows" 
                    variant="outlined" 
                    value={inflows}
                    type="number"
                    onChange={handleSaveInflows}
                />
            </Box>
            <Box className={classes.infoFieldBox}>
                <TextField 
                    className={classes.infoFieldEdit} 
                    id="outlined-basic" 
                    label="Outflows" 
                    variant="outlined" 
                    value={outflows}
                    type="number"
                    onChange={handleSaveOutflows}
                />
            </Box>
            <SubmitEntryCreateButton></SubmitEntryCreateButton>
        </Box>
        
    )
}