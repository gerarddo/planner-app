import React, { useContext, useRef, useState } from 'react';
import {ExpenseControllerApi} from '../../../../api'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import ExpensesDrawerContext from '../../../../store/expenses-drawer-context';
import CloseIcon from '@mui/icons-material/Close';
export default function CancelEditExpenseButton(props: any) {

    const drawerCtx = useContext(ExpensesDrawerContext);

    function onHandleCancel(){
        drawerCtx.updateOnEdit(false)
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleCancel}>
                <CloseIcon />
            </IconButton>
        </div>
    );
  }
  