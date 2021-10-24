import React, { useContext, useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import EntriesDrawerContext from '../../../store/entries-drawer-context';
import { EntryControllerApi } from '../../../api';
export default function EditEntryButton(props: any) {

    const drawerCtx = useContext(EntriesDrawerContext);
    const entryController = new EntryControllerApi()

    function onHandleEdit(){
        if(props.idEntry){ 
            entryController.entryControllerFindById(props.idEntry).then((item: any) => {
                drawerCtx.updateItem(item.data)
                drawerCtx.updateOnUpdate(true)
                if(!drawerCtx.onUpdate){
                    drawerCtx.updateIsOpen(true) 
                }
                drawerCtx.updateOnUpdateCase('edit')
            })
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
  