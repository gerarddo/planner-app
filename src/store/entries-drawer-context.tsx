import { createContext, useState} from 'react';
import { EntryControllerApi, ExpenseControllerApi, IEntry } from '../api';

const mockItem: IEntry = {
    id: '',
    ymd: '',
    tags: [],
    description: '',
    method: '',
    inflow: 0,
    outflow: 0
  }

const EntriesDrawerContext = createContext({
    isOpen: false,
    item: mockItem,
    onEdit: false,
    updateIsOpen: (isOpen: boolean) => {},
    openItem: (itemId: string) => {},
    updateItem: (item: IEntry) => {},
    updateOnEdit: (onEdit: boolean) => {}
})

export function EntriesDrawerContextProvider(props: any){

    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState(mockItem);
    const [onEdit, setOnEdit] = useState(false);

    const entryController = new EntryControllerApi()

    function updateIsOpenHandler(isOpen: boolean){
        setIsOpen(isOpen)
    }

    function updateItemByIdHandler(itemId: string){
        entryController.entryControllerFindById(itemId).then((item: any) => {
            setItem(item.data)
        })
    }
    function updateItemHandler(item: IEntry){
        setItem(item)
    }
    function updateOnEditHandler(onEdit: boolean){
        // setIsOpen(true)
        setOnEdit(onEdit)
    }


    const context = {
        isOpen: isOpen,
        item: item,
        onEdit: onEdit,
        updateIsOpen: updateIsOpenHandler,
        openItem: updateItemByIdHandler,
        updateItem: updateItemHandler,
        updateOnEdit: updateOnEditHandler
    };

    return <EntriesDrawerContext.Provider value={context}>{props.children}</EntriesDrawerContext.Provider>
}

export default EntriesDrawerContext