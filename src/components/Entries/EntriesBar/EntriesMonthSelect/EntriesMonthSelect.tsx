import React, { useRef, useState } from 'react';
import {EntryControllerApi} from '../../../../api'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { CSVLink } from 'react-csv'
import { IconButton, MenuItem, Select } from '@mui/material';

export default function EntriesMonthSelect() {

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
  