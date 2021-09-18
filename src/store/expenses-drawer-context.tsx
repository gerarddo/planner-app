import { createContext, useState} from 'react';
import { EntryControllerApi, ExpenseControllerApi, IEntry, IExpense } from '../api';

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
    openItem: (itemId: string) => {}
})

export function ExpensesDrawerContextProvider(props: any){

    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState(mockItem);
    const expenseController = new ExpenseControllerApi()

    function updateIsOpenHandler(isOpen: boolean){
        setIsOpen(isOpen)
    }

    function updateItemByIdHandler(itemId: string){
        expenseController.expenseControllerFindById(itemId).then((item: any) => {
            console.log('item retrieved')
            console.log(item)
            setItem(item.data)
        })
    }

    const context = {
        isOpen: isOpen,
        item: item,
        updateIsOpen: updateIsOpenHandler,
        openItem: updateItemByIdHandler,
    };

    return <ExpensesDrawerContext.Provider value={context}>{props.children}</ExpensesDrawerContext.Provider>
}

export default ExpensesDrawerContext