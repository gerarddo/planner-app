import { IconButton } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import {ExpenseControllerApi} from '../../../api'
import DeleteIcon from '@mui/icons-material/Delete';
import ExpensesContext from '../../../store/expenses-context';

export default function DeleteExpenseButton(props: any) {



    const expenseController = new ExpenseControllerApi();
    const ctx = useContext(ExpensesContext);


    function onHandleDelete(){
        expenseController.expenseControllerDeleteById(props.idExpense).then((response: any) => {
            ctx.updateExpenses()
            if(props.callback){
                props.callback()
            }
        })
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleDelete}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
  }
  