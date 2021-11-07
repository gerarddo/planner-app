import { createContext, useState} from 'react';
import { ExpenseControllerApi, IEntry } from '../api'
import { useContext } from 'react';

const EntriesPaginationContext = createContext({
    pageSize: 10,
    currentPage: 1,
    updatePageSize: (pageSize: number) => {},
    updateCurrentPage: (currentPage: number) => {}
})

export function EntriesPaginationContextProvider(props: any){

    const [pageSize, setPageSize] =  useState(10);
    const [currentPage, setCurrentPage] =  useState(1);


    function updatePageSizeHandler(pageSize: number){
        setPageSize(pageSize)
    }

    function updateCurrentPageHandler(currentPage: number){
        setCurrentPage(currentPage)
    }

    const context = {
        pageSize: pageSize,
        currentPage: currentPage,
        updatePageSize: updatePageSizeHandler,
        updateCurrentPage: updateCurrentPageHandler
    };

    return <EntriesPaginationContext.Provider value={context}>{props.children}</EntriesPaginationContext.Provider>
}

export default EntriesPaginationContext