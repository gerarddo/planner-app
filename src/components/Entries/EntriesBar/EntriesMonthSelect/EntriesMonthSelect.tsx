import React, { useContext, useRef, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import EntriesContext from '../../../../store/entries-context';
import { EntryControllerApi } from '../../../../api';
export default function EntriesMonthSelect() {

    const today = new Date()
    const ctx = useContext(EntriesContext);
    const [fetchMonth, setFetchMonth] = useState(today.getMonth())

    const handleChange = (ev: any) => {
        setFetchMonth(ev.target.value)
        ctx.updateFetchMonth(ev.target.value)
    }

    return (
        <Select
            value={fetchMonth}
            onChange={handleChange}
            displayEmpty
            variant="standard"
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ m: 1, minWidth: 120 }}
        >
            <MenuItem value={0}>January</MenuItem>
            <MenuItem value={1}>February</MenuItem>
            <MenuItem value={2}>March</MenuItem>
            <MenuItem value={3}>April</MenuItem>
            <MenuItem value={4}>May</MenuItem>
            <MenuItem value={5}>June</MenuItem>
            <MenuItem value={6}>July</MenuItem>
            <MenuItem value={7}>August</MenuItem>
            <MenuItem value={8}>September</MenuItem>
            <MenuItem value={9}>October</MenuItem>
            <MenuItem value={10}>November</MenuItem>
            <MenuItem value={11}>December</MenuItem>
        </Select>
    );
  }
  