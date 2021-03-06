import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import EntriesDrawerContext from '../../../store/entries-drawer-context';
import { IEntry } from '../../../api';
import EditTagList from '../../common/EditTagList/EditTagList';
import DeleteEntryButton from '../../common/DeleteEntryButton/DeleteEntryButton';
import EditEntryButton from '../../common/EditEntryButton/EditEntryButton';
import EntryInfoDetail from './EntryInfoDetail/EntryInfoDetail';

const useStyles = makeStyles((theme: any) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  depositContext: {
    flex: 1,
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  gridLeftBorder: {
    borderLeft: "1px solid rgba(224, 224, 224, 1)"
  }
}));

export default function EntryInfo(props: any) {

  const mockEntry: IEntry = {
    id: '',
    ymd: '',
    tags: [],
    description: '',
    method: '',
    inflow: 0,
    outflow: 0
  }
  const mockTags: string[] = []

  const classes = useStyles();
  const [entry, setEntry] = useState(mockEntry)
  const [flows, setFlows] = useState(0)
  const [tags, setTags] = useState(mockTags)

  // TODO: to get the current EntryInfo entry might be more meaningful to retrieve from EntriesDetailContext
  const drawerCtx = useContext(EntriesDrawerContext);

  useEffect(() => {    
    const newEntry: IEntry = drawerCtx.item
    setEntry(newEntry)
    setFlows(newEntry.outflow > 0 ? -newEntry.outflow : newEntry.inflow)
    if(drawerCtx.item.tags){
      setTags(drawerCtx.item.tags)
    } 
  }, [drawerCtx.item, drawerCtx.onUpdate]);

  const handleDelete = ( )=> {
    drawerCtx.updateIsOpen(false)
  }

  return (
    <React.Fragment>
      <Container>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item container xs={7}>
                <Grid item xs={11}>
                  <EntryInfoDetail entry = {entry} flows = {flows}></EntryInfoDetail>
                </Grid>
                <Grid item xs={1}>
                  <DeleteEntryButton callback={handleDelete} idEntry={entry.id}></DeleteEntryButton>
                  <EditEntryButton idEntry={entry.id}></EditEntryButton>
                </Grid>
            </Grid>
            <Grid item xs={5}>
              <EditTagList type={'entry'}></EditTagList>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

