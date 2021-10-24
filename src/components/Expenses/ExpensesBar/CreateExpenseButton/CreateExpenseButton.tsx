import React, { useContext, useRef, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {ExpenseControllerApi, IExpense} from '../../../../api'
import { IconButton } from '@mui/material';
import ExpensesDrawerContext from '../../../../store/expenses-drawer-context';
export default function CreateExpenseButton() {
    const drawerCtx = useContext(ExpensesDrawerContext);

    const mockExpense: IExpense = {
        id: '',
        ymd: '',
        tags: [],
        description: '',
        method: '',
        inflow: 0,
        outflow: 0
    }
    
    function onHandleEdit(){
        drawerCtx.updateItem(mockExpense)
        drawerCtx.updateOnUpdate(true)
        if(!drawerCtx.onUpdate){
            drawerCtx.updateIsOpen(true) 
        }
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleEdit}>
                <AddCircleIcon />
            </IconButton>
        </div>
    );
  }
  