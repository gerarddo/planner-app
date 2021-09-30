import React, { useContext, useRef, useState } from 'react';
import {EntryControllerApi} from '../../../../api'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import EntriesDrawerContext from '../../../../store/entries-drawer-context';
import CloseIcon from '@mui/icons-material/Close';
export default function CancelEditEntryButton(props: any) {

    const drawerCtx = useContext(EntriesDrawerContext);

    function onHandleCancel(){
        drawerCtx.updateOnEdit(false)
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleCancel}>
                <CloseIcon />
            </IconButton>
        </div>
    );
  }
  