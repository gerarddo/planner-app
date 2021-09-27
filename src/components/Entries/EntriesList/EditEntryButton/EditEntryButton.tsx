import React, { useRef, useState } from 'react';
import {EntryControllerApi} from '../../../../api'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
export default function EditEntryButton() {



    const entryController = new EntryControllerApi();


    function onHandleEdit(){
        // entryController.entryControllerDownloadCsv().then((response: any) => {
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
  