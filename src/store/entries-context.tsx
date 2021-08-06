import { createContext, useState} from 'react';
import { EntryControllerApi, IEntry } from '../api'
import DrawerContext from "./drawer-context";
import { useContext } from 'react';

const EntriesContext = createContext({
    fetching: false,
    month: 0,
    year: 2021,
    entries: [],
    updateIsFetching: (isFetching: boolean) => {},
    updateFetchMonth: (fetchMonth: number) => {},
    updateFetchYear: (fetchYear: number) => {},
    updateEntriesList: (entriesList: any) => {}
})

export function EntriesContextProvider(props: any){

    let today = new Date()

    const [isFetching, setIsFetching] =  useState(false);
    const [fetchYear, setFetchYear] =  useState(today.getFullYear());
    const [fetchMonth, setFetchMonth] =  useState(today.getMonth());
    const [EntriesList, setEntriesList] = useState([])
    const EntryController = new EntryControllerApi()
    

    const drawerCtx = useContext(DrawerContext)

    function updateIsFetchingHandler(isFetching: boolean){
        setIsFetching(isFetching)
    }

    function updateFetchMonthHandler(fetchMonth: number){
        setFetchMonth(fetchMonth)
    }

    function updateFetchYearHandler(fetchYear: number){
        setFetchYear(fetchYear)
    }

    function updateEntriesListHandler(entriesList: any){
        setEntriesList(entriesList)
        // setIsFetching(true)
        // let year = fetchYear
        // let month = fetchMonth
        // if(year !== 0 && month !== 0){
            // return EntryController.entryControllerFind(month, year).then((response:any) => {
            //     console.log('Fetching Entries')
            //     console.log(year)
            //     console.log(month)
            //     return response.data
            //   }).then((entriesList: any) => {
            //     setEntriesList(entriesList)
            //     setIsFetching(false)
            //     return entriesList
            //   });
        // }

    }

    const context = {
        fetching: isFetching,
        month: fetchMonth,
        year: fetchYear,
        entries: EntriesList,
        updateIsFetching: updateIsFetchingHandler,
        updateFetchMonth: updateFetchMonthHandler,
        updateFetchYear: updateFetchYearHandler,
        updateEntriesList: updateEntriesListHandler
    };

    return <EntriesContext.Provider value={context}>{props.children}</EntriesContext.Provider>
}

export default EntriesContext