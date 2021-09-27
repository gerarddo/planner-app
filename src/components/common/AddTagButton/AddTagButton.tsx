import { Box, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useContext, useEffect, useState } from 'react';
import { EntryControllerApi, ExpenseControllerApi, IEntry, IExpense } from '../../../api';
import EntriesDrawerContext from '../../../store/entries-drawer-context';
import ExpensesDrawerContext from '../../../store/expenses-drawer-context';

export default function AddTagButton(props: any) {

    const mockEntry: IEntry = {
        id: '',
        ymd: '',
        tags: [],
        description: '',
        method: '',
        inflow: 0,
        outflow: 0
    }

    const mockExpense: IExpense = {
        id: '',
        ymd: '',
        tags: [],
        description: '',
        method: '',
        inflow: 0,
        outflow: 0
    }

    const entriesDrawerCtx = useContext(EntriesDrawerContext);
    const expensesDrawerCtx = useContext(ExpensesDrawerContext);

    const [entry, setEntry] = useState(mockEntry)
    const [expense, setExpense] = useState(mockExpense)

    useEffect(() => {      
        setEntry(entriesDrawerCtx.item)
        setExpense(expensesDrawerCtx.item)
    }, [entriesDrawerCtx.item, expensesDrawerCtx.item]);

    const TYPE_EXPENSE = 'expense'
    const TYPE_ENTRY = 'entry'
    let controller: any;

    if (props.type == TYPE_ENTRY && !!entry.id){
        controller = new EntryControllerApi()
    } else  if (props.type == TYPE_EXPENSE && !!expense.id){
        controller = new ExpenseControllerApi()
    }

    const handleAddTag = () => {
        let result: any;
        console.log('doing add tag handle')

        if (props.type == TYPE_ENTRY && !!entry.id ){
            result = controller.entryControllerUpdateTagsById(entry.id,['sobrex entry']).then((data: any) => {
                console.log(data)
            })
        } else  if (props.type == TYPE_EXPENSE && !!expense.id){
            result = controller.expenseControllerUpdateTagsById(expense.id,['sobrex expense'])
        }
    }
      
    return (
        <Box>
            <Button className='closeButton' onClick={handleAddTag}>
                <AddCircleOutlineIcon></AddCircleOutlineIcon>
            </Button>
        </Box>
    )

}