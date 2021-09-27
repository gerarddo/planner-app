import { IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import {ExpenseControllerApi} from '../../../../api'
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteExpenseButton() {



    const expenseController = new ExpenseControllerApi();


    function onHandleDelete(){
        // expenseController.expenseControllerDownloadCsv().then((response: any) => {
        // })
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleDelete}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
  }
  