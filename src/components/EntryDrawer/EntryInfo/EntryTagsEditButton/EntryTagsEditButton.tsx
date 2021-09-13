
import Button from '@material-ui/core/Button';
import { EntryControllerApi, IEntry, IExpense } from '../../../../api';
import { useContext, useEffect, useState } from 'react';
import EntriesContext  from '../../../../store/entries-context'
import EntriesDrawerContext from '../../../../store/expenses-drawer-context';

export default function EntryTagsEditButton(props: any) {

    const entryCtx = useContext(EntriesContext);
    const entryController = new EntryControllerApi()
    const drawerCtx = useContext(EntriesDrawerContext);
    const mockEntry: IEntry = {
        id: '',
        ymd: '',
        tags: [],
        description: '',
        method: '',
        inflow: 0,
        outflow: 0
    }
    const [entry, setEntry] = useState(mockEntry)

    useEffect(() => {      
        setEntry(drawerCtx.item)
    }, [drawerCtx.item]);

    let updateEntryTags = function(){
        // entryController.entryControllerUpdateTagsById(entry.id,entry.tags).then((data)=>{
        //     entryCtx.updateEntries()
        // })
    }

    let btnText = 'UPDATE'

    return (
        <Button onClick={updateEntryTags} > {btnText} </Button>
    )

}