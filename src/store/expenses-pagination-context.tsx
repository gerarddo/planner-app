import { createContext, useState} from 'react';
import { ExpenseControllerApi, IExpense } from '../api'
import { useContext } from 'react';

const ExpensesPaginationContext = createContext({
    pageSize: 10,
    currentPage: 1,
    updatePageSize: (pageSize: number) => {},
    updateCurrentPage: (currentPage: number) => {}
})

export function ExpensesPaginationContextProvider(props: any){

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

    return <ExpensesPaginationContext.Provider value={context}>{props.children}</ExpensesPaginationContext.Provider>
}

export default ExpensesPaginationContext