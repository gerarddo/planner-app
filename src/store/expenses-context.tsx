import { createContext, useState} from 'react';
import { ExpenseControllerApi } from '../api'

const ExpensesContext = createContext({
    isFetching: false,
    fetchMonth: 0,
    fetchYear: 2021,
    expenses: [],
    updateIsFetching: (isFetching: boolean) => {},
    updateFetchMonth: (fetchMonth: number) => {},
    updateFetchYear: (fetchYear: number) => {},
    updateExpensesList: (expensesList: string[]) => {},
    fetchExpensesList: () => {}
})

export function ExpensesContextProvider(props: any){

    let today = new Date()

    const [isFetching, setIsFetching] =  useState(false);
    const [fetchYear, setFetchYear] =  useState(today.getFullYear());
    const [fetchMonth, setFetchMonth] =  useState(today.getMonth());
    const [expenses, setExpenses] = useState([])
    const expenseController = new ExpenseControllerApi()
    
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

    function fetchExpensesListHandler(){
        setIsFetching(true)
        if(fetchYear !== 0 && fetchMonth !== 0){
            expenseController.expenseControllerFind(fetchYear, fetchMonth).then((response: any) => {
                setExpenses(response.data)
                setIsFetching(false)
            });
        }
    }

    const context = {
        isFetching: isFetching,
        fetchMonth: fetchMonth,
        fetchYear: fetchYear,
        expenses: expenses,
        updateIsFetching: updateIsFetchingHandler,
        updateFetchMonth: updateFetchMonthHandler,
        updateFetchYear: updateFetchYearHandler,
        updateExpensesList: updateExpensesListHandler,
        fetchExpensesList: fetchExpensesListHandler
    };

    return <ExpensesContext.Provider value={context}>{props.children}</ExpensesContext.Provider>
}

export default ExpensesContext