import React, { useContext, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import ExpensesDrawerContext from '../../../../store/expenses-drawer-context';
import CloseIcon from '@mui/icons-material/Close';
export default function CancelExpenseEditButton(props: any) {

    const drawerCtx = useContext(ExpensesDrawerContext);

    function onHandleCancel(){
        drawerCtx.updateOnUpdate(false)
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleCancel}>
                <CloseIcon />
            </IconButton>
        </div>
    );
  }
  