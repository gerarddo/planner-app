import React, { useRef, useState } from 'react';
import {EntryControllerApi} from '../../../../api'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
export default function CreateEntryButton() {



    const entryController = new EntryControllerApi();


    function onHandleCreate(){
        // entryController.entryControllerDownloadCsv().then((response: any) => {
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
  