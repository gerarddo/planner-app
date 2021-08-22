import { createContext, useState} from 'react';
import { EntryControllerApi, IEntry } from '../api'
import { useContext } from 'react';

const ExpensesDetailContext = createContext({
    isFetching: false,
    fetchMonth: 0,
    fetchYear: 2021,
    entries: [],
    updateIsFetching: (isFetching: boolean) => {},
    updateFetchMonth: (fetchMonth: number) => {},
    updateFetchYear: (fetchYear: number) => {},
    updateEntries: (entries: any) => {}
})

export function ExpensesDetailContextProvider(props: any){

    let today = new Date()

    const [isFetching, setIsFetching] =  useState(false);
    const [fetchYear, setFetchYear] =  useState(today.getFullYear());
    const [fetchMonth, setFetchMonth] =  useState(today.getMonth());
    const [entries, setEntries] = useState([])

    function updateIsFetchingHandler(isFetching: boolean){
        setIsFetching(isFetching)
    }

    function updateFetchMonthHandler(fetchMonth: number){
        setFetchMonth(fetchMonth)
    }

    function updateFetchYearHandler(fetchYear: number){
        setFetchYear(fetchYear)
    }

    function updateEntriesHandler(entries: any){
        setEntries(entries)
    }

    const context = {
        isFetching: isFetching,
        fetchMonth: fetchMonth,
        fetchYear: fetchYear,
        entries: entries,
        updateIsFetching: updateIsFetchingHandler,
        updateFetchMonth: updateFetchMonthHandler,
        updateFetchYear: updateFetchYearHandler,
        updateEntries: updateEntriesHandler
    };

    return <ExpensesDetailContext.Provider value={context}>{props.children}</ExpensesDetailContext.Provider>
}

export default ExpensesDetailContext