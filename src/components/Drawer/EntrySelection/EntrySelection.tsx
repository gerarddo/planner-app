
import Button from '@material-ui/core/Button';
import { ExpenseControllerApi } from '../../../api';
import { useContext, useEffect, useState } from 'react';
import  ExpensesContext  from '../../../store/expenses-context'
import DrawerContext from '../../../store/drawer-context';

export default function EntrySelection(props: any) {

    const expenseCtx = useContext(ExpensesContext);
    const drawerCtx = useContext(DrawerContext);
    const [expenseId, setExpenseId] = useState('0')

    useEffect(() => {
        setExpenseId(drawerCtx.expense.id)
    }, []);

    const expenseController = new ExpenseControllerApi()

    let selectEntry = function(entryId:any){
        let patch: any = {entryId : entryId}
        expenseController.expenseControllerUpdateById(expenseId,patch).then((data)=>{
            expenseCtx.updateIsFetching(true)
            expenseCtx.updateExpensesList()
        })
    }

    return (
        <Button onClick={() => {selectEntry(props.entryId)}}>SELECT</Button>
        )

}