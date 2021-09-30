import { IconButton } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import {EntryControllerApi} from '../../../api'
import DeleteIcon from '@mui/icons-material/Delete';
import EntriesContext from '../../../store/entries-context';

export default function DeleteEntryButton(props: any) {



    const entryController = new EntryControllerApi();
    const ctx = useContext(EntriesContext);


    function onHandleDelete(){
        entryController.entryControllerDeleteById(props.idEntry).then((response: any) => {
            ctx.updateEntries()
            if(props.callback){
                props.callback()
            }
        })
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleDelete}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
  }

function EntryContext(EntryContext: any) {
    throw new Error('Function not implemented.');
}
  