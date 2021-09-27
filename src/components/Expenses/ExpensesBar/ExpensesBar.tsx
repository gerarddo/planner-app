import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/material/Menu';
import ExpensesDownloadButton from './ExpensesDownloadButton/ExpensesDownloadButton'
import { Badge } from '@mui/material';
import ExpensesUploadButton from './ExpensesUploadButton/ExpensesUploadButton';
import CreateExpenseButton from './CreateExpenseButton/CreateExpenseButton';
import ExpensesPagination from './ExpensesPagination/ExpensesPagination';

export default function ExpensesBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
      <Toolbar variant="dense" style={{ background: '#c8a8ff' }}>
              <Box sx={{ flexGrow: 1 }} >
                <CreateExpenseButton></CreateExpenseButton>
              </Box>
              <Box sx={{ flexGrow: 1 }}>  
                <ExpensesPagination></ExpensesPagination>
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
