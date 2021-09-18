import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CalendarIcon from '../../common/CalendarIcon/CalendarIcon';
import Title from '../../common/Title/Title';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import EntriesDrawerContext from '../../../store/entries-drawer-context';
import { EntryControllerApi, IEntry, IEntryPartial } from '../../../api';
import ExpensesDrawerContext from '../../../store/expenses-drawer-context';
import { Box, Button } from '@material-ui/core';
import AddTagButton from '../../common/AddTagButton/AddTagButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditTagList from '../../common/EditTagList/EditTagList';
const useStyles = makeStyles((theme) => ({
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
    if(newEntry.outflow > 0){
      setFlows( -newEntry.outflow )
    } else {
      setFlows( newEntry.inflow )
    }
    if(drawerCtx.item.tags){
      setTags(drawerCtx.item.tags)
    } 
  }, [drawerCtx.item]);

  return (
    <React.Fragment>
      <Container>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={3}  container>
              <CalendarIcon ymd={entry.ymd}></CalendarIcon>
            </Grid>
            <Grid item xs={4} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <h4>Entry information</h4>
                  <Title>{entry.description}</Title>
                  <Typography color="textSecondary" className={classes.depositContext}>
                    {entry.method}
                  </Typography>
                  <Typography component="p" variant="h4">
                    {flows} MXN
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}  container className={classes.gridLeftBorder}>
              <Grid item xs={12} style={{width:'100%'}}>
                <EditTagList type={'entry'}></EditTagList>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}