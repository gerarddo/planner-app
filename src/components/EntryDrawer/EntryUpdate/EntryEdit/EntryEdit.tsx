import React, { useContext } from 'react';
import { Box, MenuItem, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import EntriesUpdateContext from '../../../../store/entries-update-context';
import { IEntry } from '../../../../api';
import SubmitEntryEditButton from './SubmitEntryEditButton/SubmitEntryEditButton';
import EntriesDrawerContext from '../../../../store/entries-drawer-context';

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

let getDate = (date: any) => {
    let pad2 = (n: any) => {return (n < 10 ? '0' : '') + n};
    let myDay = new Date(date),
        month = pad2(myDay.getMonth()+1),//months (0-11)
        day   = pad2(myDay.getDate()), //day (1-31)
        year  = myDay.getFullYear();        
    return year+"-"+month+"-"+day;
}

export default function EntryEdit(props: any) {

    const classes = useStyles();
    const updateCtx = useContext(EntriesUpdateContext);
    const drawerCtx = useContext(EntriesDrawerContext);

    const entry: IEntry = drawerCtx.item

    const [date, setDate] = React.useState(getDate(entry.ymd));
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

    React.useEffect(() => {
        let current = updateCtx.current
        current.ymd = date
        current.description = description
        current.method = method
        current.inflow = inflows
        current.outflow = outflows
        updateCtx.updateCurrent(current)
      }, [date, description, method, inflows, outflows]);

    const handleSaveDate = (val: any) => {  setDate(val); }
    const handleSaveDescription = (ev: any) => {  setDescription(ev.target.value); }
    const handleSaveMethod = (ev: any) => {  setMethod(ev.target.value); }
    const handleSaveInflows = (ev: any) => {  setInflows(parseInt(ev.target.value)); }
    const handleSaveOutflows = (ev: any) => {  setOutflows(parseInt(ev.target.value)); }

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
            <SubmitEntryEditButton></SubmitEntryEditButton>
        </Box>
    )
}