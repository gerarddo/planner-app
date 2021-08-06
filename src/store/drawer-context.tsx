import { createContext, useState} from 'react';
import { IExpense } from '../api';

const DrawerContext = createContext({
    open: false,
    expense: {id:'0',ymd:'2021-01-01'},
    updateIsOpen: (isOpen: boolean) => {},
    updateLoadedExpense: (loadedExpense: object) => {}
})

export function DrawerContextProvider(props: any){

    const [isOpen, setIsOpen] = useState(false);
    const [loadedExpense, setLoadedExpense] =  useState({id:'0',ymd:'2021-01-01'});

    function updateIsOpenHandler(isOpen: boolean){
        setIsOpen(isOpen)
    }

    function updateLoadedExpenseHandler(loadedExpense: any){
        setLoadedExpense(loadedExpense)
    }

    const context = {
        open: isOpen,
        expense: loadedExpense,
        updateIsOpen: updateIsOpenHandler,
        updateLoadedExpense: updateLoadedExpenseHandler
    };

    return <DrawerContext.Provider value={context}>{props.children}</DrawerContext.Provider>
}

export default DrawerContext