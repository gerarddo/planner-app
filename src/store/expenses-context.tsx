import { createContext, useContext, useState} from 'react';
import { ExpenseControllerApi } from '../api'
import PaginationService from '../components/common/services/pagination.service'
import ExpensesPaginationContext from './expenses-pagination-context';
const ExpensesContext = createContext({
    isFetching: false,
    fetchMonth: 0,
    fetchYear: 2021,
    expenses: [],
    onDisplay: [],
    updateIsFetching: (isFetching: boolean) => {},
    updateFetchMonth: (fetchMonth: number) => {},
    updateFetchYear: (fetchYear: number) => {},
    updateExpensesList: (expensesList: string[]) => {},
    updateOnDisplayList: (expensesDisplayedList: string[]) => {},
    fetchExpensesList: () => {}
})

export function ExpensesContextProvider(props: any){

    let today = new Date()

    const [isFetching, setIsFetching] =  useState(false);
    const [fetchYear, setFetchYear] =  useState(today.getFullYear());
    const [fetchMonth, setFetchMonth] =  useState(today.getMonth());
    const [expenses, setExpenses] = useState([])
    const [onDisplay, setOnDisplay] = useState([])

    const expenseController = new ExpenseControllerApi()
    const paginationService = new PaginationService()
    const paginationCtx = useContext(ExpensesPaginationContext);
    
    function updateIsFetchingHandler(isFetching: boolean){
        setIsFetching(isFetching)
    }

    function updateFetchMonthHandler(fetchMonth: number){
        setFetchMonth(fetchMonth)
    }

    function updateFetchYearHandler(fetchYear: number){
        setFetchYear(fetchYear)
    }

    function updateExpensesListHandler(expensesList: any){
        setExpenses(expensesList)
    }

    function updateOnDisplayListHandler(onDisplayList: any){
        setOnDisplay(onDisplayList)
    }

    function fetchExpensesListHandler(){
        setIsFetching(true)
        if(fetchYear !== 0 && fetchMonth !== 0){
            expenseController.expenseControllerFind(fetchYear, fetchMonth).then((response: any) => {
                setExpenses(response.data)
                let expenses = response.data
                let today = new Date()
                expenseController.expenseControllerCurrentPage(fetchYear,fetchMonth,today.getFullYear(),today.getMonth(),today.getDate()).then((response: any) => {
                    let indices = paginationService.getListRange(response.data.length,paginationCtx.pageSize,response.data.currentPage)
                    setOnDisplay(expenses.slice(indices.indexFloor, indices.indexCeil))
                    setIsFetching(false)
                })
            });
        }
    }

    const context = {
        isFetching: isFetching,
        fetchMonth: fetchMonth,
        fetchYear: fetchYear,
        expenses: expenses,
        onDisplay: onDisplay,
        updateIsFetching: updateIsFetchingHandler,
        updateFetchMonth: updateFetchMonthHandler,
        updateFetchYear: updateFetchYearHandler,
        updateExpensesList: updateExpensesListHandler,
        updateOnDisplayList: updateOnDisplayListHandler,
        fetchExpensesList: fetchExpensesListHandler
    };

    return <ExpensesContext.Provider value={context}>{props.children}</ExpensesContext.Provider>
}

export default ExpensesContext