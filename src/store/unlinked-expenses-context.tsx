import { createContext, useState} from 'react';
import { ExpenseControllerApi } from '../api'

const UnlinkedExpensesContext = createContext({
    isFetching: false,
    fetchMonth: 0,
    fetchYear: 2021,
    expenses: [],
    updateIsFetching: (isFetching: boolean) => {},
    updateFetchMonth: (fetchMonth: number) => {},
    updateFetchYear: (fetchYear: number) => {},
    updateExpenses: () => {}
})

export function UnlinkedExpensesContextProvider(props: any){

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

    function updateExpensesHandler(){
        setIsFetching(true)
        if(fetchYear !== 0 && fetchMonth !== 0){
            expenseController.expenseControllerFindUnassigned(fetchYear, fetchMonth).then((response: any) => {
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
        updateExpenses: updateExpensesHandler
    };

    return <UnlinkedExpensesContext.Provider value={context}>{props.children}</UnlinkedExpensesContext.Provider>
}

export default UnlinkedExpensesContext