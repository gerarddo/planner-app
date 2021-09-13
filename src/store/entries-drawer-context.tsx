import { createContext, useState} from 'react';
import { IEntry } from '../api';

const mockItem: IEntry = {
    id: '',
    ymd: '',
    tags: [],
    description: '',
    method: '',
    inflow: 0,
    outflow: 0
  }

const EntriesDrawerContext = createContext({
    isOpen: false,
    item: mockItem,
    updateIsOpen: (isOpen: boolean) => {},
    updateItem: (item: object) => {}
})

export function EntriesDrawerContextProvider(props: any){

    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState(mockItem);

    function updateIsOpenHandler(isOpen: boolean){
        setIsOpen(isOpen)
    }

    function updateItemHandler(item: any){
        setItem(item)
    }

    const context = {
        isOpen: isOpen,
        item: item,
        updateIsOpen: updateIsOpenHandler,
        updateItem: updateItemHandler,
    };

    return <EntriesDrawerContext.Provider value={context}>{props.children}</EntriesDrawerContext.Provider>
}

export default EntriesDrawerContext