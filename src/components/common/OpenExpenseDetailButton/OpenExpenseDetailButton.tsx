import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from 'react';
import ExpensesDrawerContext from "../../../store/expenses-drawer-context";
import ExpensesDetailContext from "../../../store/expenses-detail-context";
import { useContext } from 'react';
import './OpenExpenseDetailButton.css';
import { EntryControllerApi } from "../../../api";

export default function OpenExpenseDetailButton(props: any){
    
    const anchor = 'bottom'
    const drawerCtx = useContext(ExpensesDrawerContext)
    const detailCtx = useContext(ExpensesDetailContext);
    const expenseIsLinked = props.expense.entryId!= undefined
    const entryController = new EntryControllerApi()

    function updateEntries(){
        drawerCtx.openItem(props.expense.id)
        drawerCtx.updateIsOpen(true)
        // TODO: set right fetch month and year
        let fetchYear = detailCtx.fetchYear
        let fetchMonth = detailCtx.fetchMonth
        if(fetchYear !== 0 && fetchMonth !== 0){
            entryController.entryControllerFind(fetchYear, fetchMonth).then((response: any) => {
                detailCtx.updateEntries(response.data)
                drawerCtx.updateIsOpen(true)
            })
        }
    }

    let btnText = 'LINK'
    if(expenseIsLinked){ btnText = 'RELINK' }
    
    return(
        <React.Fragment key={anchor}>
            <div>
                <Button onClick={updateEntries}>{btnText}</Button>
            </div>
        </React.Fragment>
    )
}