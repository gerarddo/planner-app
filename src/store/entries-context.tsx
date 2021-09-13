import { createContext, useState} from 'react';
import { EntryControllerApi, IEntry } from '../api'
import { useContext } from 'react';

const EntriesContext = createContext({
    isFetching: false,
    fetchMonth: 0,
    fetchYear: 2021,
    entries: [],
    updateIsFetching: (isFetching: boolean) => {},
    updateFetchMonth: (fetchMonth: number) => {},
    updateFetchYear: (fetchYear: number) => {},
    updateEntries: () => {}
})

export function EntriesContextProvider(props: any){

    let today = new Date()

    const [isFetching, setIsFetching] =  useState(false);
    const [fetchYear, setFetchYear] =  useState(today.getFullYear());
    const [fetchMonth, setFetchMonth] =  useState(today.getMonth());
    const [entries, setEntries] = useState([])
    const entryController = new EntryControllerApi()

    function updateIsFetchingHandler(isFetching: boolean){
        setIsFetching(isFetching)
    }

    function updateFetchMonthHandler(fetchMonth: number){
        setFetchMonth(fetchMonth)
    }

    function updateFetchYearHandler(fetchYear: number){
        setFetchYear(fetchYear)
    }

    function updateEntriesHandler(){
        setIsFetching(true)
        if(fetchYear !== 0 && fetchMonth !== 0){
            entryController.entryControllerFind(fetchYear, fetchMonth).then((response: any) => {
                setEntries(response.data)
                setIsFetching(false)
            });
        }
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

    return <EntriesContext.Provider value={context}>{props.children}</EntriesContext.Provider>
}

export default EntriesContext