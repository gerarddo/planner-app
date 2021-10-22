import React, { useEffect, useState }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import { useContext } from 'react';
import ExpenseInfo from './ExpenseInfo/ExpenseInfo'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import LinkList from './LinkList/LinkList';
import ExpensesDrawerContext from '../../store/expenses-drawer-context';
import { IExpense } from '../../api';
import ExpenseUpdate from './ExpenseUpdate/ExpenseUpdate';
import CloseExpenseDrawerButton from './CloseExpenseDrawerButton/CloseExpenseDrawerButton';

export default function ExpenseDrawer(props: any) {

  const drawerCtx = useContext(ExpensesDrawerContext);

  const mockExpense: IExpense = {
    id: '',
    ymd: '',
    tags: [],
    description: '',
    method: '',
    inflow: 0,
    outflow: 0
  }

  const [drawerState, setDrawerState] = React.useState(false);
  const [expense, setExpense] = useState(mockExpense)
  const [onUpdate, setOnUpdate] =  useState(false)
  const [onUpdateCase, setOnUpdateCase] =  useState('create')

  const [flows, setFlows] = useState(0)

  useEffect(() => {      

    // current expense state
    const currentExpense: IExpense = drawerCtx.item
    setExpense(currentExpense)
    setFlows(currentExpense.outflow > 0 ? -currentExpense.outflow  : currentExpense.inflow);

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
    console.log(expense)
    console.log(onUpdate)
    console.log(onUpdateCase)
    if(onUpdateCase == 'create'){
      return (
        <ExpenseUpdate></ExpenseUpdate>
      )
    } else if (onUpdateCase == 'edit'){
      return (
        <ExpenseUpdate expense = {expense} flows = {flows}></ExpenseUpdate>
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
          <ExpenseInfo expense = {expense}></ExpenseInfo>
          <br/>
          <LinkList expense = {expense}></LinkList>
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
            <CloseExpenseDrawerButton></CloseExpenseDrawerButton>
          </Grid>
        </Container>
        <br/>
          {conditionalUpdate()}
      </div>
    </Drawer>
  );

}
