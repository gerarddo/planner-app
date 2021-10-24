import React, { useContext, useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import ExpensesDrawerContext from '../../../store/expenses-drawer-context';
import { ExpenseControllerApi } from '../../../api';
import ExpensesUpdateContext from '../../../store/expenses-update-context';

export default function EditExpenseButton(props: any) {

    const drawerCtx = useContext(ExpensesDrawerContext);
    const expenseController = new ExpenseControllerApi()
    const updateCtx = useContext(ExpensesUpdateContext);

    function onHandleEdit(){
        if(props.idExpense){
            expenseController.expenseControllerFindById(props.idExpense).then((item: any) => {
                drawerCtx.updateItem(item.data)
                updateCtx.updateCurrent(item.data)
                drawerCtx.updateOnUpdate(true)
                if(!drawerCtx.onUpdate){
                    drawerCtx.updateIsOpen(true) 
                }
                drawerCtx.updateOnUpdateCase('edit')
            })
        }
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleEdit}>
                <EditIcon />
            </IconButton>
        </div>
    );
  }
  