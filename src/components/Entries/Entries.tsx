import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useContext } from 'react';
import EntriesList from './EntriesList/EntriesList';
import EntryDrawer from '../EntryDrawer/EntryDrawer'
import EntriesContext from '../../store/entries-context';
import MenuDrawerContext from '../../store/menu-drawer-context';
import { Grid, Paper } from '@mui/material';
import EntriesBar from './EntriesBar/EntriesBar'
import EntriesFooter from './EntriesFooter/EntriesFooter';
import { EntryControllerApi } from '../../api';
import EntriesPaginationContext from '../../store/entries-pagination-context';

const useStyles = makeStyles((theme: any) => ({
  paper: {
    padding: theme.spacing(0),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function Entries() {

    const classes = useStyles();
    const ctx = useContext(EntriesContext);
    const menuCtx = useContext(MenuDrawerContext);
    const paginationCtx = useContext(EntriesPaginationContext);
    const entryController = new EntryControllerApi()

    useEffect(() => {
        ctx.fetchEntriesList()
        menuCtx.updateTabTitle('All Entries')
        let today = new Date()
        entryController.entryControllerCurrentPage(ctx.fetchYear,ctx.fetchMonth,today.getFullYear(),today.getMonth(),today.getDate()).then((response: any) => {
          paginationCtx.updateCurrentPage(response.data.currentPage)
        })

      }, [ctx.fetchMonth,ctx.fetchYear]);

    return(
      <React.Fragment>
        <Paper className={classes.paper}>
          <Grid container>
            <EntriesBar></EntriesBar>
          </Grid>
          <Grid container style={{marginTop : 20}}>
            <br />
            <EntriesList></EntriesList>
            <EntryDrawer></EntryDrawer>
            </Grid>
            <EntriesFooter></EntriesFooter>
          </Paper>
      </React.Fragment>
    )
}