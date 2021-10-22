import React, { useEffect, useState }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import { useContext } from 'react';
import EntryInfo from './EntryInfo/EntryInfo'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import UnlinkList from './UnlinkList/UnlinkList';
import EntriesDrawerContext from '../../store/entries-drawer-context';
import { IEntry } from '../../api';
import EntryUpdate from './EntryUpdate/EntryUpdate';
import CloseEntryDrawerButton from './CloseEntryDrawerButton/CloseEntryDrawerButton'

export default function EntryDrawer(props: any) {
  
  const drawerCtx = useContext(EntriesDrawerContext);

  const mockEntry: IEntry = {
    id: '',
    ymd: '',
    tags: [],
    description: '',
    method: '',
    inflow: 0,
    outflow: 0
  }

  const [drawerState, setDrawerState] = React.useState(false);
  const [entry, setEntry] = useState(mockEntry)
  const [onUpdate, setOnUpdate] =  useState(false)
  const [onUpdateCase, setOnUpdateCase] =  useState('create')

  const [flows, setFlows] = useState(0)

  useEffect(() => {  

    // current entry state
    const currentEntry: IEntry = drawerCtx.item
    setEntry(currentEntry)
    setFlows(currentEntry.outflow > 0 ? -currentEntry.outflow  : currentEntry.inflow);

    // current drawer state
    setDrawerState(drawerCtx.isOpen) // opens drawer
    setOnUpdate(drawerCtx.onUpdate) // toggles entryInfo or entryUpdate
    setOnUpdateCase(drawerCtx.onUpdateCase) // toggles create or edit

  }, [drawerCtx.isOpen, drawerCtx.onUpdate, drawerCtx.onUpdateCase]);

  const useStyles = makeStyles((theme: any) => ({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    seeMore: {
      marginTop: theme.spacing(3),
    },
    closeButton: {
      color: "white",
      backgroundColor: "blue",
      top: "50%",
      height: 30,
      float: "right",
      position: "relative",
      transform: "translateY(-50%)"
    }
  }));

  const classes = useStyles();
  type Anchor = 'top' | 'left' | 'bottom' | 'right';
  const anchor: Anchor = 'bottom'

  const conditionalCreateOrEdit = () => {
    if(onUpdateCase == 'create'){
      return (
        <EntryUpdate></EntryUpdate>
      )
    } else if (onUpdateCase == 'edit'){
      return (
        <EntryUpdate entry = {entry} flows = {flows}></EntryUpdate>
      )
    } else {
      return (
        <h4>No case was selected</h4>
      )
    }
  }

  const conditionalUpdate = () => {
    if(onUpdate){
      return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
          {conditionalCreateOrEdit()}
        </Box>
      )
    } else {
      return (
        <div>
          <EntryInfo entry = {entry}></EntryInfo>
          <br/>
          <UnlinkList entry = {entry}></UnlinkList>
        </div>
      )
    }
  }

  return (
    <Drawer anchor={anchor} open={drawerState} 
    // onClose={closeDrawer}
    >
      <div
        className={ clsx( classes.list, { [ classes.fullList ]: anchor === 'bottom' } ) }
        role="presentation"
        >
        <br/>
        <Container>
          <Grid item xs={12} container >
            <CloseEntryDrawerButton></CloseEntryDrawerButton>
          </Grid>
        </Container>
        <br/>
          {conditionalUpdate()}
      </div>
    </Drawer>
  );
}
