
import Button from '@material-ui/core/Button';
import { ExpenseControllerApi } from '../../../../api';
import { useContext, useEffect, useState } from 'react';
import UnlinkedExpensesContext  from '../../../../store/unlinked-expenses-context'
import ExpensesDrawerContext from '../../../../store/expenses-drawer-context';
import './EntryLinkButton.css';

export default function EntryLinkButton(props: any) {

    const expenseCtx = useContext(UnlinkedExpensesContext);
    const drawerCtx = useContext(ExpensesDrawerContext);
    const [expenseId, setExpenseId] = useState('0')

    useEffect(() => {
        setExpenseId(drawerCtx.item.id)
    }, []);

    const expenseController = new ExpenseControllerApi()

    let linkEntry = function(entryId:any){
        let patch: any = {entryId : entryId}
        expenseController.expenseControllerUpdateById(expenseId,patch).then((data)=>{
            expenseCtx.updateIsFetching(true)
            expenseCtx.updateExpenses()
        })
    }
    
    let btnText = 'LINK'

    if(props.highlighted){
        btnText = "UNLINK"
    }

    

    return (
        <Button onClick={() => {linkEntry(props.entryId)}} > {btnText} </Button>
        )

}