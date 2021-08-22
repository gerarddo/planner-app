import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../common/Title/Title';
import { useContext } from 'react';
import OpenExpenseDetailButton from '../../common/OpenExpenseDetailButton/OpenExpenseDetailButton';
import ExpensesDrawerContext from '../../../store/expenses-drawer-context';
import UnlinkedExpensesContext from '../../../store/unlinked-expenses-context';
import Divider from '@material-ui/core/Divider';

export default function UnlinkedExpensesList(props: any) {

  const [expenses, setExpenses] = useState([])
  const expenseCtx = useContext(UnlinkedExpensesContext);

  useEffect(() => {
    setExpenses(expenseCtx.expenses)
  }, [expenseCtx.expenses]);

  function conditionalComponent(){
    if(expenses.length == 0){
      return(
        <div>      
          <Divider variant="middle" />
          <p>No expenses found.</p>
        </div>
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
            {expenses.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>{row.ymd}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.method}</TableCell>
                <TableCell align="right">{row.inflow}</TableCell>
                <TableCell align="right">{row.outflow}</TableCell>
                <TableCell align="right">
                  <OpenExpenseDetailButton expense={row}></OpenExpenseDetailButton>
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
          {conditionalComponent()}
      </React.Fragment>
  );
}