import React, { useEffect, useRef, useState } from 'react';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import { useContext } from 'react';
import Pagination from '@mui/material/Pagination';
import EntriesList from './EntriesList/EntriesList';
import EntryDrawer from '../EntryDrawer/EntryDrawer'
import EntriesContext from '../../store/entries-context';
import MenuDrawerContext from '../../store/menu-drawer-context';
import { Grid, Paper } from '@mui/material';
import EntriesBar from './EntriesBar/EntriesBar'
import EntriesDownloadButton from './EntriesBar/EntriesDownloadButton/EntriesDownloadButton'
import EntriesUploadButton from '../Entries/EntriesBar/EntriesUploadButton/EntriesUploadButton';
import EntriesPagination from './EntriesBar/EntriesPagination/EntriesPagination';
function preventDefault(event: any) {
  event.preventDefault();
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(0),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));


export default function Entries() {

    const [fetchMonth, setFetchMonth] = useState(1);
    const classes = useStyles();
    const ctx = useContext(EntriesContext);
    const menuCtx = useContext(MenuDrawerContext);

    useEffect(() => {
        ctx.updateEntries()
        menuCtx.updateTabTitle('All Entries')
    }, [ctx.fetchMonth]);

    return(
        <React.Fragment>
          <Paper className={classes.paper}>
            <EntriesBar></EntriesBar>
            <Grid container style={{marginTop : 20}}>
              <br />
              <EntriesList year={2021} month={fetchMonth}></EntriesList>
              <div className={classes.seeMore}>
                  <div className={classes.root}>
                  </div>
                  <Link color="primary" href="#" onClick={preventDefault}>
                  See more Entries 
                  </Link>
              </div> 
              <EntryDrawer></EntryDrawer>
              </Grid> 
            </Paper>
        </React.Fragment>
    )
}