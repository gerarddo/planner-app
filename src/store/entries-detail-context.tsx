import { createContext, useState} from 'react';

const EntriesDetailContext = createContext({
    isFetching: false,
    fetchMonth: 0,
    fetchYear: 2021,
    expenses: [],
    updateIsFetching: (isFetching: boolean) => {},
    updateFetchMonth: (fetchMonth: number) => {},
    updateFetchYear: (fetchYear: number) => {},
    updateExpenses: (expenses: any) => {}
})

export function EntriesDetailContextProvider(props: any){

    let today = new Date()

    const [isFetching, setIsFetching] =  useState(false);
    const [fetchYear, setFetchYear] =  useState(today.getFullYear());
    const [fetchMonth, setFetchMonth] =  useState(today.getMonth());
    const [expenses, setExpenses] = useState([])

    function updateIsFetchingHandler(isFetching: boolean){
        setIsFetching(isFetching)
    }

    function updateFetchMonthHandler(fetchMonth: number){
        setFetchMonth(fetchMonth)
    }

    function updateFetchYearHandler(fetchYear: number){
        setFetchYear(fetchYear)
    }

    function updateExpensesHandler(expenses: any){
        setExpenses(expenses)
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

    return <EntriesDetailContext.Provider value={context}>{props.children}</EntriesDetailContext.Provider>
}

export default EntriesDetailContext