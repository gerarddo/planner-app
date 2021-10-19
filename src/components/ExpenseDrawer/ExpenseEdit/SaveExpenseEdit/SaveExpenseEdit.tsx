import React, { useContext, useRef, useState } from 'react';
import {EntryControllerApi} from '../../../../api'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import ExpensesDrawerContext from '../../../../store/expenses-drawer-context';
import SaveIcon from '@mui/icons-material/Save';
export default function SaveEntryEdit(props: any) {

    const drawerCtx = useContext(ExpensesDrawerContext);

    const [entry, setDate] = React.useState('');


    function onHandleSave(){
        drawerCtx.updateOnEdit(false)
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleSave}>
                <SaveIcon />
            </IconButton>
        </div>
    );
  }
  