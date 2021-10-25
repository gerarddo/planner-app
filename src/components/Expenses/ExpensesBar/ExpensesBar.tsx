import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ExpensesDownloadButton from './ExpensesDownloadButton/ExpensesDownloadButton'
import ExpensesUploadButton from './ExpensesUploadButton/ExpensesUploadButton';
import CreateExpenseButton from './CreateExpenseButton/CreateExpenseButton';
import ExpensesMonthSelect from './ExpensesMonthSelect/ExpensesMonthSelect'

export default function ExpensesBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar variant="dense" style={{ background: '#c8a8ff' }}>
          <Box>
            <CreateExpenseButton></CreateExpenseButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>  
            <ExpensesMonthSelect></ExpensesMonthSelect>
          </Box>
          <Box>
            <ExpensesDownloadButton ></ExpensesDownloadButton>
          </Box>
          <Box>
            <ExpensesUploadButton></ExpensesUploadButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
