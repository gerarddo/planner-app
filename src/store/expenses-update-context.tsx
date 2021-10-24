import { createContext, useState} from 'react';
import { ExpenseControllerApi, IExpense } from '../api'
import { useContext } from 'react';


const mockItem: IExpense = {
    id: '',
    ymd: '',
    tags: [],
    description: '',
    method: '',
    inflow: 0,
    outflow: 0
  }
const ExpensesUpdateContext = createContext({
    current: mockItem,
    updateCurrent: (current: IExpense) => {}
})

export function ExpensesUpdateContextProvider(props: any){

    const [current, setCurrent] =  useState(mockItem);

    function updateCurrentHandler(current: IExpense){
        setCurrent(current)
    }

    const context = {
        current: current,
        updateCurrent: updateCurrentHandler
    };

    return <ExpensesUpdateContext.Provider value={context}>{props.children}</ExpensesUpdateContext.Provider>
}

export default ExpensesUpdateContext