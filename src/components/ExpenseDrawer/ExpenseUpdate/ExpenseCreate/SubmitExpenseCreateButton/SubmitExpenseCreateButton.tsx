import React, { useContext, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import ExpensesDrawerContext from '../../../../../store/expenses-drawer-context';
import PublishIcon from '@mui/icons-material/Publish';
import ExpensesUpdateContext from '../../../../../store/expenses-update-context';
import { ExpenseControllerApi } from '../../../../../api';
import ExpensesContext from '../../../../../store/expenses-context';
export default function SubmitExpenseCreateButton() {

    const drawerCtx = useContext(ExpensesDrawerContext);
    const updateCtx = useContext(ExpensesUpdateContext);
    const expensesCtx = useContext(ExpensesContext);

    const expenseController = new ExpenseControllerApi()

    function onHandleSave(){
        let current = updateCtx.current
        if(drawerCtx.onUpdate && drawerCtx.onUpdateCase == 'create'){
            delete current.id
        }
        expenseController.expenseControllerCreate(current).then((response: any) => {
            drawerCtx.updateItem(response.data)
            expensesCtx.fetchExpensesList()
            drawerCtx.updateOnUpdate(false)
            drawerCtx.updateOnUpdateCase('create') // default to create
        })
    }

    return (
        <div>
            <IconButton  onClick={onHandleSave}>
                <PublishIcon />
            </IconButton>
        </div>
    );
  }
  