import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import EntriesPagination from './EntriesPagination/EntriesPagination';
import EntriesSearch from './EntriesSearch/EntriesSearch';

export default function EntriesFooter() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="sticky">
        <Toolbar variant="dense" style={{ background: '#c8a8ff' }}>
          <Box>
            <EntriesSearch></EntriesSearch>
          </Box>
          <Box sx={{ flexGrow: 1 }} >  
            
          </Box>
          <Box sx={{ flexGrow: -1 }} >  
            <EntriesPagination></EntriesPagination>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
