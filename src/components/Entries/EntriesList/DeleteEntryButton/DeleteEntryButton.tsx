import { IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import {EntryControllerApi} from '../../../../api'
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteEntryButton() {



    const entryController = new EntryControllerApi();


    function onHandleDelete(){
        // entryController.entryControllerDownloadCsv().then((response: any) => {
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
  