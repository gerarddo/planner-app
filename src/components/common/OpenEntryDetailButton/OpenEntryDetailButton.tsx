import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import EntryDrawerContext from "../../../store/entries-drawer-context";
import EntryDetailContext from "../../../store/entries-detail-context";
import { useContext } from 'react';
import './OpenEntryDetailButton.css';

export default function OpenEntryDetailButton(props: any){
    
    const anchor = 'bottom'
    const drawerCtx = useContext(EntryDrawerContext)
    const detailCtx = useContext(EntryDetailContext);

    function updateEntries(){
        detailCtx.updateExpenses(props.entry.expenses)
        drawerCtx.openItem(props.entry.id)
        drawerCtx.updateIsOpen(true)
    }

    let btnText = 'UNLINK'

    if(props.entry.expenses == undefined){
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