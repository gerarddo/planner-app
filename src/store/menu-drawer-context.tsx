import { createContext, useState} from 'react';

const MenuDrawerContext = createContext({
    isOpen: false,
    item: '',
    tabTitle: '',
    updateIsOpen: (isOpen: boolean) => {},
    updateItem: (item: object) => {},
    updateTabTitle: (title: string) => {},
})

export function MenuDrawerContextProvider(props: any){

    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState('');
    const [tabTitle, setTabTitle] = useState('My Unlinked Expenses');

    function updateIsOpenHandler(isOpen: boolean){
        setIsOpen(isOpen)
    }

    function updateItemHandler(item: any){
        setItem(item)
    }

    function updateTabTitleHandler(title: any){
        setTabTitle(title)
    }

    const context = {
        isOpen: isOpen,
        item: item,
        tabTitle: tabTitle,
        updateIsOpen: updateIsOpenHandler,
        updateItem: updateItemHandler,
        updateTabTitle: updateTabTitleHandler
    };

    return <MenuDrawerContext.Provider value={context}>{props.children}</MenuDrawerContext.Provider>
}

export default MenuDrawerContext