import React, { useContext, useEffect, useRef, useState } from 'react';
import { Pagination } from '@mui/material';
import ExpensesContext from '../../../../store/expenses-context';
import ExpensesPaginationContext from '../../../../store/expenses-pagination-context';
import PaginationService from '../../../common/services/pagination.service';

export default function ExpensesPagination() {

    const [page, setPage] = useState(0);
    const [numOfPages, setNumOfPages] = useState(0);

    const expenseCtx = useContext(ExpensesContext);
    const paginationCtx = useContext(ExpensesPaginationContext);
    const paginationService = new PaginationService();

    useEffect(() => {
        setNumOfPages(Math.ceil(expenseCtx.expenses.length/paginationCtx.pageSize))
        setPage(paginationCtx.currentPage)
        let indices = paginationService.getListRange(expenseCtx.expenses.length,paginationCtx.pageSize,paginationCtx.currentPage)
        expenseCtx.updateOnDisplayList(expenseCtx.expenses.slice(indices.indexFloor, indices.indexCeil))
    }, [expenseCtx.expenses,paginationCtx.pageSize,paginationCtx.currentPage]);

    function currentPageUpdate(ev: object, pageNum: number){
        paginationCtx.updateCurrentPage(pageNum)
    }

    return (
        <Pagination page={page} count={numOfPages} color="secondary" onChange={currentPageUpdate}/>
    );
  }
  