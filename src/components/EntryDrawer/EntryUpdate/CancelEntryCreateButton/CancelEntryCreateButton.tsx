import React, { useContext, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import EntriesDrawerContext from '../../../../store/entries-drawer-context';
import CloseIcon from '@mui/icons-material/Close';
export default function CancelEntryCreateButton(props: any) {

    const drawerCtx = useContext(EntriesDrawerContext);

    function onHandleCancel(){
        drawerCtx.updateIsOpen(false)
        drawerCtx.updateOnUpdate(false)
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleCancel}>
                <CloseIcon />
            </IconButton>
        </div>
    );
  }
  