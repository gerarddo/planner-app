import React, { useRef, useState } from 'react';
import {ExpenseControllerApi} from '../../../../api'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
export default function CreateExpenseButton() {



    const expenseController = new ExpenseControllerApi();


    function onHandleCreate(){
        // expenseController.expenseControllerDownloadCsv().then((response: any) => {
        // })
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleCreate}>
                <AddCircleIcon />
            </IconButton>
        </div>
    );
  }
  