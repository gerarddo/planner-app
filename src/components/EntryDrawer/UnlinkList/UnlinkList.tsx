import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ExpenseUnlinkButton from './ExpenseUnlinkButton/ExpenseUnlinkButton';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import ExpensesDetailContext from '../../../store/expenses-detail-context';
import EntriesDetailContext from '../../../store/entries-detail-context';


export default function UnlinkList(props: any){

    let expenses: any = []
    let expensesExist = false

    if(props.entry.expenses){
        expenses = props.entry.expenses
        expensesExist = true
    }

    if(expensesExist){
        return(
            <Container>
                <Paper>
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
                            { 
                                expenses.map((row: any) => {
                                    return (
                                    <TableRow key={row.id} >
                                        <TableCell>{row.ymd}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.method}</TableCell>
                                        <TableCell align="right">{row.inflow}</TableCell>
                                        <TableCell align="right">{row.outflow}</TableCell>
                                        <TableCell align="right">
                                        <span>
                                            <ExpenseUnlinkButton expenseId={row.id} />
                                        </span>
                                        </TableCell>
                                    </TableRow>
                                )})
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        )
    } else {
        return(<br/>)
    }
    
}