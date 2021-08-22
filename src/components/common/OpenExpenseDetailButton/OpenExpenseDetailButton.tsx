import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import ExpensesDrawerContext from "../../../store/expenses-drawer-context";
import ExpensesDetailContext from "../../../store/expenses-detail-context";
import { useContext } from 'react';
import './OpenExpenseDetailButton.css';
export default function OpenExpenseDetailButton(props: any){
    let anchor = 'bottom'

    const drawerCtx = useContext(ExpensesDrawerContext)
    const detailCtx = useContext(ExpensesDetailContext);

    function updateEntries(){
        drawerCtx.updateItem(props.expense)
        detailCtx.updateFetchMonth((new Date(props.expense.ymd).getMonth()))
        drawerCtx.updateIsOpen(true)
        detailCtx.updateIsFetching(true)
    }

    const expenseIsLinked = props.expense.entryId!= undefined
    let btnText = 'LINK'
    if(expenseIsLinked){
        btnText = 'RELINK'
    }
    return(
        <React.Fragment key={anchor}>
            <div>
                <Button onClick={updateEntries} >  {btnText}</Button>
            </div>
        </React.Fragment>
    )
}