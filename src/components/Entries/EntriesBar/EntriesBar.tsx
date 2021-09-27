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
import EntriesDownloadButton from './EntriesDownloadButton/EntriesDownloadButton'
import { Badge, Grid } from '@mui/material';
import EntriesUploadButton from './EntriesUploadButton/EntriesUploadButton';
import EntriesPagination from './EntriesPagination/EntriesPagination';
import CreateEntryButton from './CreateEntryButton/CreateEntryButton';
export default function EntriesBar() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="sticky">
        <Toolbar variant="dense" style={{ background: '#c8a8ff' }}>
              <Box sx={{ flexGrow: 1 }} >
                <CreateEntryButton></CreateEntryButton>
              </Box>
              <Box sx={{ flexGrow: 1 }}>  
              <EntriesPagination></EntriesPagination>
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
