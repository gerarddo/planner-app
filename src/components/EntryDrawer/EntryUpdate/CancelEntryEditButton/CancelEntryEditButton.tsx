import React, { useContext, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import EntriesDrawerContext from '../../../../store/entries-drawer-context';
import CloseIcon from '@mui/icons-material/Close';
export default function CancelEditEntryButton(props: any) {

    const drawerCtx = useContext(EntriesDrawerContext);

    function onHandleCancel(){
        drawerCtx.updateOnUpdate(false)
        drawerCtx.updateOnUpdateCase('create') // default to create
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleCancel}>
                <CloseIcon />
            </IconButton>
        </div>
    );
  }
  