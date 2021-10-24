import React, { useContext, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import ExpensesDrawerContext from '../../../../../store/expenses-drawer-context';

import PublishIcon from '@mui/icons-material/Publish';
import ExpensesUpdateContext from '../../../../../store/expenses-update-context';
import { ExpenseControllerApi } from '../../../../../api';
import ExpensesDetailContext from '../../../../../store/expenses-detail-context';
import ExpensesContext from '../../../../../store/expenses-context';
export default function SubmitExpenseEditButton(props: any) {

    const drawerCtx = useContext(ExpensesDrawerContext);
    const updateCtx = useContext(ExpensesUpdateContext);
    const detailCtx = useContext(ExpensesDetailContext);
    const expensesCtx = useContext(ExpensesContext);

    const expenseController = new ExpenseControllerApi()

    function onHandleSave(){

        let current: any = updateCtx.current
        let currentId = current.id 

        if(current.id !== undefined){ delete current.id }
        if(current.entry !== undefined){ delete current.entry }
        
        expenseController.expenseControllerReplaceById(currentId, current).then((response: any) => {
            drawerCtx.updateItem(current)
            expensesCtx.updateExpenses()
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
  