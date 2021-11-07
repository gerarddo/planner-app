import React, { useContext, useEffect, useRef, useState } from 'react';
import { Pagination } from '@mui/material';
import EntriesContext from '../../../../store/entries-context';
import EntriesPaginationContext from '../../../../store/entries-pagination-context';
import PaginationService from '../../../common/services/pagination.service';

export default function EntriesPagination() {

    const [page, setPage] = useState(0);
    const [numOfPages, setNumOfPages] = useState(0);

    const entryCtx = useContext(EntriesContext);
    const paginationCtx = useContext(EntriesPaginationContext);
    const paginationService = new PaginationService();

    useEffect(() => {
        setNumOfPages(Math.ceil(entryCtx.entries.length/paginationCtx.pageSize))
        setPage(paginationCtx.currentPage)
        let indices = paginationService.getListRange(entryCtx.entries.length,paginationCtx.pageSize,paginationCtx.currentPage)
        entryCtx.updateOnDisplayList(entryCtx.entries.slice(indices.indexFloor, indices.indexCeil))
    }, [entryCtx.entries,paginationCtx.pageSize,paginationCtx.currentPage]);

    function currentPageUpdate(ev: object, pageNum: number){
        paginationCtx.updateCurrentPage(pageNum)
    }

    return (
        <Pagination page={page} count={numOfPages} color="secondary" onChange={currentPageUpdate}/>
    );
  }
  