import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import EntriesDrawerContext from "../../../store/entries-drawer-context";
import EntriesDetailContext from "../../../store/entries-detail-context";
import { useContext } from 'react';

export default function OpenEntryDetailButton(props: any){
    let anchor = 'bottom'

    const drawerCtx = useContext(EntriesDrawerContext)
    const detailCtx = useContext(EntriesDetailContext);

    function updateExpenses(){
        drawerCtx.updateItem(props.entry)
        detailCtx.updateFetchMonth((new Date(props.entry.ymd).getMonth()))
        drawerCtx.updateIsOpen(true)
        detailCtx.updateIsFetching(true)
    }

    return(
        <React.Fragment key={anchor}>
            <div>
                <Button onClick={updateExpenses}>LINK</Button>
            </div>
        </React.Fragment>
    )
}