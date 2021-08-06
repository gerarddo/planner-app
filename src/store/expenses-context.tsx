import { createContext, useState} from 'react';
import { ExpenseControllerApi } from '../api'

const ExpensesContext = createContext({
    fetching: false,
    month: 0,
    year: 2021,
    expenses: [],
    updateIsFetching: (isFetching: boolean) => {},
    updateFetchMonth: (fetchMonth: number) => {},
    updateFetchYear: (fetchYear: number) => {},
    updateExpensesList: () => {}
})

export function ExpensesContextProvider(props: any){

    let today = new Date()

    const [isFetching, setIsFetching] =  useState(false);
    const [fetchYear, setFetchYear] =  useState(today.getFullYear());
    const [fetchMonth, setFetchMonth] =  useState(today.getMonth());
    const [expensesList, setExpensesList] = useState([])
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

    function updateExpensesListHandler(){
        setIsFetching(true)
        let year = fetchYear
        let month = fetchMonth
        if(year !== 0 && month !== 0){
            expenseController.expenseControllerFindUnassigned(month, year).then(response => {
                console.log('Fetching expenses')
                return response.data
              }).then((expensesList: any) => {
                setExpensesList(expensesList)
                setIsFetching(false)
              });
        }

    }

    const context = {
        fetching: isFetching,
        month: fetchMonth,
        year: fetchYear,
        expenses: expensesList,
        updateIsFetching: updateIsFetchingHandler,
        updateFetchMonth: updateFetchMonthHandler,
        updateFetchYear: updateFetchYearHandler,
        updateExpensesList: updateExpensesListHandler
    };

    return <ExpensesContext.Provider value={context}>{props.children}</ExpensesContext.Provider>
}

export default ExpensesContext