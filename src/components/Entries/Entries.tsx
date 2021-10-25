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
import EntriesFooter from './EntriesFooter/EntriesFooter';
function preventDefault(event: any) {
  event.preventDefault();
}

const useStyles = makeStyles((theme: any) => ({
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
            <EntryDrawer></EntryDrawer>
            </Grid>
            <EntriesFooter></EntriesFooter>
          </Paper>
      </React.Fragment>
    )
}