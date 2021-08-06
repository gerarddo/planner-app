import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import DrawerContext from "../../../store/drawer-context";
import EntriesContext from '../../../store/entries-context';
import { useContext } from 'react';

export default function DrawerButton(props: any){
    let anchor = 'bottom'

    const drawerCtx = useContext(DrawerContext)
    const entryCtx = useContext(EntriesContext);

    function updateEntries(){
        console.log('about to open drawer!')
        console.log(props.expense.ymd)        
        drawerCtx.updateLoadedExpense(props.expense)
        entryCtx.updateFetchMonth((new Date(props.expense.ymd).getMonth()))
        drawerCtx.updateIsOpen(true)
        entryCtx.updateIsFetching(true)
    }

    
    
    return(
        <React.Fragment key={anchor}>
            <div>
                <Button onClick={updateEntries}>Assign</Button>
            </div>
        </React.Fragment>
    )
}