import { createContext, useState} from 'react';
import { IExpense } from '../api';

const mockItem: IExpense = {
    id: '',
    ymd: '',
    tags: [],
    description: '',
    method: '',
    inflow: 0,
    outflow: 0
}

const ExpensesDrawerContext = createContext({
    isOpen: false,
    item: mockItem,
    updateIsOpen: (isOpen: boolean) => {},
    updateItem: (item: object) => {}
})

export function ExpensesDrawerContextProvider(props: any){

    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState(mockItem);

    function updateIsOpenHandler(isOpen: boolean){
        setIsOpen(isOpen)
    }

    function updateItemHandler(loadedExpense: any){
        setItem(loadedExpense)
    }

    const context = {
        isOpen: isOpen,
        item: item,
        updateIsOpen: updateIsOpenHandler,
        updateItem: updateItemHandler,
    };

    return <ExpensesDrawerContext.Provider value={context}>{props.children}</ExpensesDrawerContext.Provider>
}

export default ExpensesDrawerContext