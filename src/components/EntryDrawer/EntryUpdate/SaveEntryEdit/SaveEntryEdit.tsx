import React, { useContext, useRef, useState } from 'react';
import {EntryControllerApi} from '../../../../api'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import EntriesDrawerContext from '../../../../store/entries-drawer-context';
import SaveIcon from '@mui/icons-material/Save';
export default function SaveEntryEdit(props: any) {

    const drawerCtx = useContext(EntriesDrawerContext);

    const [entry, setDate] = React.useState('');


    function onHandleSave(){
        drawerCtx.updateOnUpdate(false)   
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleSave}>
                <SaveIcon />
            </IconButton> 
        </div>
    );
  }
  