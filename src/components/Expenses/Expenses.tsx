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
import { ExpenseControllerApi } from '../../api';
import ExpensesPaginationContext from '../../store/expenses-pagination-context';

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
    const paginationCtx = useContext(ExpensesPaginationContext);
    const expenseController = new ExpenseControllerApi()
    useEffect(() => {
        ctx.fetchExpensesList()
        menuCtx.updateTabTitle('All Expenses')
        let today = new Date()
        expenseController.expenseControllerCurrentPage(ctx.fetchYear,ctx.fetchMonth,today.getFullYear(),today.getMonth(),today.getDate()).then((response: any) => {
          paginationCtx.updateCurrentPage(response.data.currentPage)
        })
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