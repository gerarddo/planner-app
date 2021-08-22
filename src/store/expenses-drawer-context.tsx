import { createContext, useState} from 'react';
import { IExpense } from '../api';

const ExpensesDrawerContext = createContext({
    isOpen: false,
    item: {id:'0',ymd:'2021-01-01'},
    updateIsOpen: (isOpen: boolean) => {},
    updateItem: (item: object) => {}
})

export function ExpensesDrawerContextProvider(props: any){

    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState({id:'0',ymd:'2021-01-01'});

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