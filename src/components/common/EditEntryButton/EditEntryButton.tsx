import React, { useContext, useRef, useState } from 'react';
import {EntryControllerApi} from '../../../api'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import EntriesDrawerContext from '../../../store/entries-drawer-context';
export default function EditEntryButton(props: any) {

    const drawerCtx = useContext(EntriesDrawerContext);

    function onHandleEdit(){
        if(props.idEntry){
            drawerCtx.openItem(props.idEntry)
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
  