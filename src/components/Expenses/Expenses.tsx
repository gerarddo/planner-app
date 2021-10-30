import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useContext } from 'react';
import ExpensesList from './ExpensesList/ExpensesList';
import ExpenseDrawer from '../ExpenseDrawer/ExpenseDrawer'
import ExpensesContext from '../../store/expenses-context';
import MenuDrawerContext from '../../store/menu-drawer-context';
import { Grid, Paper } from '@mui/material';
import ExpensesBar from './ExpensesBar/ExpensesBar';
import ExpensesFooter from './ExpensesFooter/ExpensesFooter';

const useStyles = makeStyles((theme: any) => ({
  paper: {
    padding: theme.spacing(0),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));


export default function Expenses() {

    const classes = useStyles();
    const ctx = useContext(ExpensesContext);
    const menuCtx = useContext(MenuDrawerContext);

    useEffect(() => {
        ctx.fetchExpensesList()
        menuCtx.updateTabTitle('All Expenses')
    }, [ctx.fetchMonth,ctx.fetchYear]);

    return(
      <React.Fragment>
        <Paper className={classes.paper}>
          <Grid container>
            <ExpensesBar></ExpensesBar>
          </Grid>
          <Grid container style={{marginTop : 20}}>
            <br />
            <ExpensesList></ExpensesList>
            <ExpenseDrawer></ExpenseDrawer>
            </Grid>
            <ExpensesFooter></ExpensesFooter>
          </Paper>
      </React.Fragment>
    )
}