import { createContext, useState} from 'react';
import { ExpenseControllerApi, IEntry } from '../api'
import { useContext } from 'react';


const mockItem: IEntry = {
    id: '',
    ymd: '',
    tags: [],
    description: '',
    method: '',
    inflow: 0,
    outflow: 0
  }
const EntriesUpdateContext = createContext({
    current: mockItem,
    updateCurrent: (current: IEntry) => {}
})

export function EntriesUpdateContextProvider(props: any){

    const [current, setCurrent] =  useState(mockItem);

    function updateCurrentHandler(current: IEntry){
        setCurrent(current)
    }

    const context = {
        current: current,
        updateCurrent: updateCurrentHandler
    };

    return <EntriesUpdateContext.Provider value={context}>{props.children}</EntriesUpdateContext.Provider>
}

export default EntriesUpdateContext