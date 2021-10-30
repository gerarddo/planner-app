import React, { useContext, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import EntrysDrawerContext from '../../../../../store/entries-drawer-context';

import PublishIcon from '@mui/icons-material/Publish';
import EntrysUpdateContext from '../../../../../store/entries-update-context';
import { EntryControllerApi } from '../../../../../api';
import EntrysDetailContext from '../../../../../store/entries-detail-context';
import EntrysContext from '../../../../../store/entries-context';
export default function SubmitEntryEditButton(props: any) {

    const drawerCtx = useContext(EntrysDrawerContext);
    const updateCtx = useContext(EntrysUpdateContext);
    const detailCtx = useContext(EntrysDetailContext);
    const entriesCtx = useContext(EntrysContext);

    const entryController = new EntryControllerApi()

    function onHandleSave(){

        let current: any = updateCtx.current
        let currentId = current.id 

        // if(current.id !== undefined){ delete current.id }
        if(current.expenses !== undefined){ delete current.expenses }
        
        entryController.entryControllerReplaceById(currentId, current).then((response: any) => {
            console.log(response)
            drawerCtx.updateItem(current)
            entriesCtx.fetchEntriesList()
            drawerCtx.updateOnUpdate(false)
            drawerCtx.updateOnUpdateCase('create') // default to create
        })            
        

    }

    return (
        <div>
            <IconButton  onClick={onHandleSave}>
                <PublishIcon />
            </IconButton>
        </div>
    );
  }
  