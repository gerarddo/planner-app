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
    onUpdate: false,
    onUpdateCase: 'create',
    updateIsOpen: (isOpen: boolean) => {},
    openItem: (itemId: string) => {},
    updateItem: (item: IExpense) => {},
    updateOnUpdate: (onUpdate: boolean) => {},
    updateOnUpdateCase: (onUpdateCase: string) => {}
})

export function ExpensesDrawerContextProvider(props: any){

    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState(mockItem);
    const [onUpdate, setOnUpdate] = useState(false);
    const [onUpdateCase, setOnUpdateCase] = useState('create');

    const expenseController = new ExpenseControllerApi()

    function updateIsOpenHandler(isOpen: boolean){
        setIsOpen(isOpen)
    }

    function updateItemByIdHandler(itemId: string){
        expenseController.expenseControllerFindById(itemId).then((item: any) => {
            setItem(item.data)
        })
    }

    function updateItemHandler(item: IEntry){
        setItem(item)
    }
    
    function updateOnUpdateHandler(onUpdate: boolean){
        setOnUpdate(onUpdate)
    }

    function updateOnUpdateCaseHandler(onUpdateCase: string){
        setOnUpdateCase(onUpdateCase)
    }


    const context = {
        isOpen: isOpen,
        item: item,
        onUpdate: onUpdate,
        onUpdateCase: onUpdateCase,
        updateIsOpen: updateIsOpenHandler,
        openItem: updateItemByIdHandler,
        updateItem: updateItemHandler,
        updateOnUpdate: updateOnUpdateHandler,
        updateOnUpdateCase: updateOnUpdateCaseHandler
    };

    return <ExpensesDrawerContext.Provider value={context}>{props.children}</ExpensesDrawerContext.Provider>
}

export default ExpensesDrawerContext