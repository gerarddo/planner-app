import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ExpensesPagination from './ExpensesPagination/ExpensesPagination'
import ExpensesSearch from './ExpensesSearch/ExpensesSearch';

export default function ExpensesFooter() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="sticky">
        <Toolbar variant="dense" style={{ background: '#c8a8ff' }}>
          <Box>
            <ExpensesSearch></ExpensesSearch>
          </Box>
          <Box sx={{ flexGrow: 1 }} >  
            
          </Box>
          <Box sx={{ flexGrow: -1 }} >  
            <ExpensesPagination></ExpensesPagination>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
