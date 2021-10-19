import React, { useContext, useRef, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {EntryControllerApi, IEntry} from '../../../../api'
import { IconButton } from '@mui/material';
import EntriesDrawerContext from '../../../../store/entries-drawer-context';
export default function CreateEntryButton() {
    const drawerCtx = useContext(EntriesDrawerContext);

    const mockEntry: IEntry = {
        id: '',
        ymd: '',
        tags: [],
        description: '',
        method: '',
        inflow: 0,
        outflow: 0
    }
    
    function onHandleEdit(){
        drawerCtx.updateItem(mockEntry)
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
  