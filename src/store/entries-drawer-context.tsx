import { createContext, useState} from 'react';

const EntriesDrawerContext = createContext({
    isOpen: false,
    item: {id:'0',ymd:'2021-01-01'},
    updateIsOpen: (isOpen: boolean) => {},
    updateItem: (item: object) => {}
})

export function EntriesDrawerContextProvider(props: any){

    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState({id:'0',ymd:'2021-01-01'});

    function updateIsOpenHandler(isOpen: boolean){
        setIsOpen(isOpen)
    }

    function updateItemHandler(item: any){
        setItem(item)
    }

    const context = {
        isOpen: isOpen,
        item: item,
        updateIsOpen: updateIsOpenHandler,
        updateItem: updateItemHandler,
    };

    return <EntriesDrawerContext.Provider value={context}>{props.children}</EntriesDrawerContext.Provider>
}

export default EntriesDrawerContext