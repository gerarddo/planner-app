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
    onEdit: false,
    updateIsOpen: (isOpen: boolean) => {},
    openItem: (itemId: string) => {},
    updateOnEdit: (onEdit: boolean) => {}
})

export function ExpensesDrawerContextProvider(props: any){

    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState(mockItem);
    const [onEdit, setOnEdit] = useState(false);

    const expenseController = new ExpenseControllerApi()

    function updateIsOpenHandler(isOpen: boolean){
        setIsOpen(isOpen)
    }

    function updateItemByIdHandler(itemId: string){
        expenseController.expenseControllerFindById(itemId).then((item: any) => {

            setItem(item.data)
        })
    }

    function updateOnEditHandler(onEdit: boolean){
        setOnEdit(onEdit)
    }

    const context = {
        isOpen: isOpen,
        item: item,
        onEdit: onEdit,
        updateIsOpen: updateIsOpenHandler,
        openItem: updateItemByIdHandler,
        updateOnEdit: updateOnEditHandler
    };

    return <ExpensesDrawerContext.Provider value={context}>{props.children}</ExpensesDrawerContext.Provider>
}

export default ExpensesDrawerContext