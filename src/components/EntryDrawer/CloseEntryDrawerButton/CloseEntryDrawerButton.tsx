import { useContext } from 'react';
import { Box, Button } from "@mui/material";
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import EntriesDrawerContext from '../../../store/entries-drawer-context';

export default function CloseEntryDrawerButton(props: any) {

  const drawerCtx = useContext(EntriesDrawerContext);

  const closeDrawer = ( event: React.KeyboardEvent | React.MouseEvent ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    drawerCtx.updateIsOpen(false) // close the drawer
    drawerCtx.updateOnUpdate(false) // set to false in case it was true
    drawerCtx.updateOnUpdateCase('create') // default to create
  };

  return (
      <Box>
      <Button onClick={closeDrawer} className='closeButton' >
        <CancelSharpIcon></CancelSharpIcon>
      </Button>
    </Box>
  )
}