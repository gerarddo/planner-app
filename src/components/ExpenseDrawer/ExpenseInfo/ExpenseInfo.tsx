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
import { IExpense } from '../../../api';
import ExpensesDrawerContext from '../../../store/expenses-drawer-context';
import { Box, Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddTagButton from '../../common/AddTagButton/AddTagButton';
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

export default function ExpenseInfo(props: any) {

  const mockExpense: IExpense = {
    id: '',
    ymd: '',
    tags: [],
    description: '',
    method: '',
    inflow: 0,
    outflow: 0
  }

  const classes = useStyles();
  const [expense, setExpense] = useState(mockExpense)
  const [flows, setFlows] = useState(0)

  // TODO: to get the current EntryInfo entry might be more meaningful to retrieve from EntriesDetailContext
  const drawerCtx = useContext(ExpensesDrawerContext);

  useEffect(() => {    
    const newExpense: IExpense = drawerCtx.item
    setExpense(newExpense)
    if(newExpense.outflow > 0){
      setFlows( -newExpense.outflow )
    } else {
      setFlows( newExpense.inflow )
    }
  }, [drawerCtx.item]);

  return (
    <React.Fragment>
      <Container>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={3}  container>
              <CalendarIcon ymd={expense.ymd}></CalendarIcon>
            </Grid>
            <Grid item xs={4} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <h4>Expense information</h4>
                  <Title>{expense.description}</Title>
                  <Typography color="textSecondary" className={classes.depositContext}>
                    {expense.method}
                  </Typography>
                  <Typography component="p" variant="h4">
                    {flows} MXN
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}  container className={classes.gridLeftBorder}>
              <Grid item xs={12} style={{width:'100%'}}>
                <EditTagList type={'expense'}></EditTagList>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}