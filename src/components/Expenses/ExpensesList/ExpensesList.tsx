import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../common/Title/Title';
import { useContext } from 'react';
import OpenExpenseDetailButton from '../../common/OpenExpenseDetailButton/OpenExpenseDetailButton';
import ExpensesContext from '../../../store/expenses-context';
import Divider from '@mui/material/Divider';
import DeleteExpenseButton from '../../common/DeleteExpenseButton/DeleteExpenseButton';
import { Grid } from '@mui/material';
import EditExpenseButton from '../../common/EditExpenseButton/EditExpenseButton';

export default function ExpensesList(props: any) {

  const [expenses, setExpenses] = useState([])
  const expenseCtx = useContext(ExpensesContext);

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
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell align="right">Inflows</TableCell>
              <TableCell align="right">Outflows</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Grid container>
                    <Grid item>
                      <DeleteExpenseButton idExpense={row.id}></DeleteExpenseButton>
                    </Grid>
                    <Grid item>
                      <EditExpenseButton idExpense={row.id}></EditExpenseButton>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.ymd}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.method}</TableCell>
                <TableCell align="right">{row.inflow}</TableCell>
                <TableCell align="right">{row.outflow}</TableCell>
                <TableCell align="center">
                  <OpenExpenseDetailButton expense={row} highlighted={row.entryId !== undefined}></OpenExpenseDetailButton>
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