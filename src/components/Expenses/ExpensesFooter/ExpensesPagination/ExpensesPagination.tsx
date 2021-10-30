import React, { useContext, useEffect, useRef, useState } from 'react';
import { IconButton, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpensesContext from '../../../../store/expenses-context';


export default function ExpensesPagination() {

    const today = new Date()

    const pageCount = today.getMonth()+1

    const [fetchMonth, setFetchMonth] = useState(1);
    const [page, setPage] = useState(pageCount);
    const ctx = useContext(ExpensesContext);

    function monthExpensesUpdate(ev: object, pageNum: number){
        // ctx.updateFetchMonth(pageNum - 1)
        setFetchMonth(pageNum - 1)
        setPage(pageNum)
    }

    return (
        <Pagination page={page} count={pageCount} color="secondary" onChange={monthExpensesUpdate}/>
    );
  }
  