import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from 'react';
import EntriesDrawerContext from "../../../store/entries-drawer-context";
import EntryDetailContext from "../../../store/entries-detail-context";
import { useContext } from 'react';
import './OpenEntryDetailButton.css';
import { EntryControllerApi } from "../../../api";

export default function OpenEntryDetailButton(props: any){
    
    const anchor = 'bottom'
    const drawerCtx = useContext(EntriesDrawerContext)
    const detailCtx = useContext(EntryDetailContext);
    const entryController = new EntryControllerApi()

    function updateEntries(){
        entryController.entryControllerFindById(props.entry.id).then((response: any) => {
            drawerCtx.updateItem(response.data)
            detailCtx.updateExpenses(response.data.expenses) // set for the unlink list
            drawerCtx.updateIsOpen(true)
        })
    }

    let btnText = 'UNLINK'

    if(props.entry.expenses == undefined || props.entry.expenses.length == 0){
        btnText = 'VIEW'
    }

    return(
        <React.Fragment key={anchor}>
            <div>
                <Button onClick={updateEntries}>{btnText}</Button>
            </div>
        </React.Fragment>
    )
}