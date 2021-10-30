import React, { useContext, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import EntriesDrawerContext from '../../../../../store/entries-drawer-context';
import PublishIcon from '@mui/icons-material/Publish';
import EntriesUpdateContext from '../../../../../store/entries-update-context';
import { EntryControllerApi } from '../../../../../api';
import EntriesDetailContext from '../../../../../store/entries-detail-context';
import EntriesContext from '../../../../../store/entries-context';
export default function SubmitEntryCreateButton() {

    const drawerCtx = useContext(EntriesDrawerContext);
    const updateCtx = useContext(EntriesUpdateContext);
    const detailCtx = useContext(EntriesDetailContext);
    const entriesCtx = useContext(EntriesContext);

    const entryController = new EntryControllerApi()

    function onHandleSave(){
        let current = updateCtx.current
        if(drawerCtx.onUpdate && drawerCtx.onUpdateCase == 'create'){
            delete current.id
        }
        entryController.entryControllerCreate(current).then((response: any) => {
            drawerCtx.updateItem(response.data)
            detailCtx.updateExpenses([])
            entriesCtx.fetchEntriesList()
            // entriesCtx.updateEntries()
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
  