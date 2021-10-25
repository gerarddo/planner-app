import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import EntriesDownloadButton from './EntriesDownloadButton/EntriesDownloadButton'
import EntriesUploadButton from './EntriesUploadButton/EntriesUploadButton';
import CreateEntryButton from './CreateEntryButton/CreateEntryButton';
import EntriesMonthSelect from './EntriesMonthSelect/EntriesMonthSelect';

export default function EntriesBar() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="sticky">
        <Toolbar variant="dense" style={{ background: '#c8a8ff' }}>
          <Box >
            <CreateEntryButton></CreateEntryButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <EntriesMonthSelect></EntriesMonthSelect>
          </Box>
          <Box>
            <EntriesDownloadButton ></EntriesDownloadButton>
          </Box>
          <Box>
            <EntriesUploadButton></EntriesUploadButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
