import React, { useContext, useRef, useState } from 'react';
import {ExpenseControllerApi} from '../../../api'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import ExpensesDrawerContext from '../../../store/expenses-drawer-context';
export default function EditExpenseButton(props: any) {

    const drawerCtx = useContext(ExpensesDrawerContext);

    function onHandleEdit(){
        if(props.idExpense){
            drawerCtx.openItem(props.idExpense)
        }
        drawerCtx.updateOnEdit(true)
        if(!drawerCtx.onEdit){
            drawerCtx.updateIsOpen(true) 
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
  