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
import { Box, Button } from '@mui/material';
import AddTagButton from '../../common/AddTagButton/AddTagButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditTagList from '../../common/EditTagList/EditTagList';
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

  // @ts-ignore
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