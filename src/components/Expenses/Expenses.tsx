import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import ExpensesList from './ExpensesList/ExpensesList';
import ExpenseDrawer from '../ExpenseDrawer/ExpenseDrawer'
import ExpensesContext from '../../store/expenses-context';
import MenuDrawerContext from '../../store/menu-drawer-context';

function preventDefault(event: any) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  seeMore: {
    marginTop: theme.spacing(3),
  }
}));


export default function Expenses() {

    const today = new Date()
    const pageCount = today.getMonth()+1
    const [fetchMonth, setFetchMonth] = useState(1);
    const [page, setPage] = useState(pageCount);
    const classes = useStyles();
    const ctx = useContext(ExpensesContext);
    const menuCtx = useContext(MenuDrawerContext);

    useEffect(() => {
        ctx.updateExpenses()
        menuCtx.updateTabTitle('All Expenses')
    }, [ctx.fetchMonth]);

    function monthExpensesUpdate(ev: object, pageNum: number){
        let month = pageNum - 1
        ctx.updateFetchMonth(month)
        setFetchMonth(month)
        setPage(pageNum)
    }

    return(
        <React.Fragment>
            <Pagination page={page} count={pageCount} color="secondary" onChange={monthExpensesUpdate}/>
            <ExpensesList year={2021} month={fetchMonth}></ExpensesList>
            <div className={classes.seeMore}>
                <div className={classes.root}>
                    <Pagination page={page} count={pageCount} color="secondary" onChange={monthExpensesUpdate}/>
                </div>
                <Link color="primary" href="#" onClick={preventDefault}>
                See more Expenses 
                </Link>
            </div> 
            <ExpenseDrawer></ExpenseDrawer>
        </React.Fragment>
    )
}