import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CalendarIcon from '../../common/CalendarIcon/CalendarIcon';
import Title from '../../common/Title/Title';
import { IExpense } from '../../../api';
import ExpensesDrawerContext from '../../../store/expenses-drawer-context';
import EditTagList from '../../common/EditTagList/EditTagList';
import EditExpenseButton from '../../common/EditExpenseButton/EditExpenseButton';
import DeleteExpenseButton from '../../common/DeleteExpenseButton/DeleteExpenseButton';
import ExpenseInfoDetail from './ExpenseInfoDetail/ExpenseInfoDetail';

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

  // @ts-ignore
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
                  <ExpenseInfoDetail expense = {expense} flows = {flows}></ExpenseInfoDetail>
                </Grid>
                <Grid item xs={1}>
                  <DeleteExpenseButton callback={handleDelete} idExpense={expense.id}></DeleteExpenseButton>
                  <EditExpenseButton></EditExpenseButton>
                </Grid>
            </Grid>
            <Grid item xs={5}>
              <EditTagList type={'expense'}></EditTagList>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}