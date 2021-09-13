import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import ExpensesDrawerContext from "../../../store/expenses-drawer-context";
import ExpensesDetailContext from "../../../store/expenses-detail-context";
import { useContext } from 'react';
import './OpenExpenseDetailButton.css';

export default function OpenExpenseDetailButton(props: any){
    
    const anchor = 'bottom'
    const drawerCtx = useContext(ExpensesDrawerContext)
    const detailCtx = useContext(ExpensesDetailContext);
    const expenseIsLinked = props.expense.entryId!= undefined

    function updateEntries(){
        drawerCtx.updateItem(props.expense)
        drawerCtx.updateIsOpen(true)
        // TODO: set right fetch month and year
        detailCtx.updateEntries()
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