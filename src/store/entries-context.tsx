import { createContext, useContext, useState} from 'react';
import { EntryControllerApi } from '../api'
import PaginationService from '../components/common/services/pagination.service'
import EntriesPaginationContext from './entries-pagination-context';
const EntriesContext = createContext({
    isFetching: false,
    fetchMonth: 0,
    fetchYear: 2021,
    entries: [],
    onDisplay: [],
    updateIsFetching: (isFetching: boolean) => {},
    updateFetchMonth: (fetchMonth: number) => {},
    updateFetchYear: (fetchYear: number) => {},
    updateEntriesList: (entriesList: string[]) => {},
    updateOnDisplayList: (entriesDisplayedList: string[]) => {},
    fetchEntriesList: () => {}
})

export function EntriesContextProvider(props: any){

    let today = new Date()

    const [isFetching, setIsFetching] =  useState(false);
    const [fetchYear, setFetchYear] =  useState(today.getFullYear());
    const [fetchMonth, setFetchMonth] =  useState(today.getMonth());
    const [entries, setEntries] = useState([])
    const [onDisplay, setOnDisplay] = useState([])

    const entryController = new EntryControllerApi()
    const paginationService = new PaginationService()
    const paginationCtx = useContext(EntriesPaginationContext);
    
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
        setEntries(entriesList)
    }

    function updateOnDisplayListHandler(onDisplayList: any){
        setOnDisplay(onDisplayList)
    }

    function fetchEntriesListHandler(){
        setIsFetching(true)
        if(fetchYear !== 0 && fetchMonth !== 0){
            entryController.entryControllerFind(fetchYear, fetchMonth).then((response: any) => {
                setEntries(response.data)
                let entries = response.data
                let today = new Date()
                entryController.entryControllerCurrentPage(fetchYear,fetchMonth,today.getFullYear(),today.getMonth(),today.getDate()).then((response: any) => {
                    let indices = paginationService.getListRange(response.data.length,paginationCtx.pageSize,response.data.currentPage)
                    setOnDisplay(entries.slice(indices.indexFloor, indices.indexCeil))
                    setIsFetching(false)
                })
            });
        }
    }

    const context = {
        isFetching: isFetching,
        fetchMonth: fetchMonth,
        fetchYear: fetchYear,
        entries: entries,
        onDisplay: onDisplay,
        updateIsFetching: updateIsFetchingHandler,
        updateFetchMonth: updateFetchMonthHandler,
        updateFetchYear: updateFetchYearHandler,
        updateEntriesList: updateEntriesListHandler,
        updateOnDisplayList: updateOnDisplayListHandler,
        fetchEntriesList: fetchEntriesListHandler
    };

    return <EntriesContext.Provider value={context}>{props.children}</EntriesContext.Provider>
}

export default EntriesContext