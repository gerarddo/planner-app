import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CalendarIcon from '../../common/CalendarIcon/CalendarIcon';
import Title from '../../common/Title/Title';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EntriesDrawerContext from '../../../store/entries-drawer-context';
import { EntryControllerApi, IEntry, IEntryPartial } from '../../../api';
import ExpensesDrawerContext from '../../../store/expenses-drawer-context';
import { Box, Button, Card, CardContent } from '@mui/material';
import AddTagButton from '../../common/AddTagButton/AddTagButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditTagList from '../../common/EditTagList/EditTagList';
import DeleteEntryButton from '../../common/DeleteEntryButton/DeleteEntryButton';
import EditEntryButton from '../../common/EditEntryButton/EditEntryButton';
import EntryInfoDetail from './EntryInfoDetail/EntryInfoDetail';
import EntryInfoEdit from './EntryInfoEdit/EntryInfoEdit';
import CancelEditEntryButton from './CancelEditEntryButton/CancelEditEntryButton';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

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
  const [onEdit, setOnEdit] =  useState(false)
  const [date, setDate] = React.useState('');

  // TODO: to get the current EntryInfo entry might be more meaningful to retrieve from EntriesDetailContext
  const drawerCtx = useContext(EntriesDrawerContext);

  useEffect(() => {    
    const newEntry: IEntry = drawerCtx.item
    setEntry(newEntry)
    if(newEntry.outflow > 0){
      setFlows( -newEntry.outflow )
    } else {
      setFlows( newEntry.inflow )
    }
    if(drawerCtx.item.tags){
      setTags(drawerCtx.item.tags)
    } 
    if(drawerCtx.item.ymd){
      setDate(drawerCtx.item.ymd)
    }
    setOnEdit(drawerCtx.onEdit)
  }, [drawerCtx.item, drawerCtx.onEdit]);

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
                  <EditEntryButton></EditEntryButton>
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

