import React, { useRef, useState } from 'react';
import {ExpenseControllerApi} from '../../../../api'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
export default function EditExpenseButton() {



    const expenseController = new ExpenseControllerApi();


    function onHandleEdit(){
        // expenseController.expenseControllerDownloadCsv().then((response: any) => {
        // })
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleEdit}>
                <EditIcon />
            </IconButton>
        </div>
    );
  }
  