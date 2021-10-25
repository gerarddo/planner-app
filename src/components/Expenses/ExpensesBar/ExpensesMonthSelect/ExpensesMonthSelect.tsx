import React, { useRef, useState } from 'react';
import { MenuItem, Select } from '@mui/material';

export default function ExpensesMonthSelect() {

    const [fetchMonth, setFetchMonth] = useState(0)

    const handleChange = (ev: any) => {
        setFetchMonth(ev.target.value)
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
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={0}>January</MenuItem>
            <MenuItem value={1}>February</MenuItem>
            <MenuItem value={2}>March</MenuItem>
        </Select>
    );
  }
  