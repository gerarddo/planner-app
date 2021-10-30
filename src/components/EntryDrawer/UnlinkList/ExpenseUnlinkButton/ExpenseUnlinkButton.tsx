
import Button from '@mui/material/Button';
import { ExpenseControllerApi } from '../../../../api';
import { useContext, useEffect, useState } from 'react';
import ExpensesContext  from '../../../../store/expenses-context'
import ExpensesDrawerContext from '../../../../store/expenses-drawer-context';
import './EntryLinkButton.css';

export default function ExpenseUnlinkButton(props: any) {

    const expenseCtx = useContext(ExpensesContext);
    const expenseController = new ExpenseControllerApi()

    let unlinkExpense = function(){
        expenseController.expenseControllerResetLinkById(props.expenseId).then((data)=>{
            expenseCtx.fetchExpensesList()
        })
    }

    let btnText = 'UNLINK'

    return (
        <Button onClick={unlinkExpense} > {btnText} </Button>
        )

}