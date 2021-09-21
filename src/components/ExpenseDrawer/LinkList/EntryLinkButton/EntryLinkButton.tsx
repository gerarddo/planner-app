
import Button from '@material-ui/core/Button';
import { ExpenseControllerApi } from '../../../../api';
import { useContext, useEffect, useState } from 'react';
import ExpensesContext  from '../../../../store/expenses-context'
import ExpensesDrawerContext from '../../../../store/expenses-drawer-context';


export default function EntryLinkButton(props: any) {

    const expenseCtx = useContext(ExpensesContext);

    const drawerCtx = useContext(ExpensesDrawerContext);
    const [expenseId, setExpenseId] = useState('0')

    useEffect(() => {
        if(drawerCtx.item.id !== undefined){
            setExpenseId(drawerCtx.item.id)
        }
    }, []);

    const expenseController = new ExpenseControllerApi()

    let linkEntry = function(entryId:any){
        let patch: any = {entryId : entryId}
        expenseController.expenseControllerUpdateById(expenseId,patch).then((data)=>{
            expenseCtx.updateExpenses()
        })
    }

    let unlinkEntry = function(){
        expenseController.expenseControllerResetLinkById(expenseId).then((data)=>{
            expenseCtx.updateExpenses()
        })
    }

    let linkCall = function(){
        if (props.highlighted){
            unlinkEntry()
        } else {
            linkEntry(props.entryId)
        }
        drawerCtx.updateIsOpen(false)
    }
    
    let btnText = 'LINK'

    if(props.highlighted){
        btnText = "UNLINK"
    }

    return (
        <Button onClick={linkCall} > {btnText} </Button>
        )

}