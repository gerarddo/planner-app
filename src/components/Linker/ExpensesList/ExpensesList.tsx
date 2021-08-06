import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../common/Title/Title';
import TemporaryDrawer from '../../Drawer/Drawer'
import  ExpensesContext  from '../../../store/expenses-context'
import { useContext } from 'react';
import DrawerButton from '../../common/DrawerButton/DrawerButton';
import DrawerContext from '../../../store/drawer-context';
import Divider from '@material-ui/core/Divider';

export default function ExpensesList(props: any) {

  const [loadedExpenses, setLoadedExpenses] = useState([])
  const expenseCtx = useContext(ExpensesContext);
  const drawerCtx = useContext(DrawerContext);

  function setEntries(expense: any){
    drawerCtx.updateLoadedExpense(expense)
  }

  useEffect(() => {
    setLoadedExpenses(expenseCtx.expenses)
  }, [expenseCtx.expenses]);

  function conditionalComponent(){
    if(loadedExpenses.length == 0){
      return(
      <div>      <Divider variant="middle" />
      <p>No expenses found.</p></div>
      )
    } else {
      return(

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell align="right">Inflows</TableCell>
              <TableCell align="right">Outflows</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadedExpenses.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>{row.ymd}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.method}</TableCell>
                <TableCell align="right">{row.inflow}</TableCell>
                <TableCell align="right">{row.outflow}</TableCell>
                <TableCell align="right">
                  <DrawerButton expense={row}></DrawerButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      )
    }
  }

  return (
    <React.Fragment>
              <Title>My Expenses</Title>
          {conditionalComponent()}
      </React.Fragment>
  );
}