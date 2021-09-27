import React, { useEffect, useState }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import { useContext } from 'react';
import EntryInfo from './EntryInfo/EntryInfo'
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box, Button } from "@mui/material";
import UnlinkList from './UnlinkList/UnlinkList';
import EntriesDrawerContext from '../../store/entries-drawer-context';


export default function EntryDrawer(props: any) {

  const drawerCtx = useContext(EntriesDrawerContext);
  const [drawerState, setDrawerState] = React.useState(false);
  const [entry, setEntry] = useState({})
  type Anchor = 'top' | 'left' | 'bottom' | 'right';
  const anchor: Anchor = 'bottom'

  const useStyles = makeStyles((theme: any) => ({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    seeMore: {
      marginTop: theme.spacing(3),
    },
    closeButton: {
      color: "white",
      backgroundColor: "blue",
      top: "50%",
      height: 30,
      float: "right",
      position: "relative",
      transform: "translateY(-50%)"
    }
  }));

  // @ts-ignore
  const classes = useStyles();

  const closeDrawer =( event: React.KeyboardEvent | React.MouseEvent, ) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      drawerCtx.updateIsOpen(false)
  };

  useEffect(() => {      
      setEntry(drawerCtx.item)
      setDrawerState(drawerCtx.isOpen)
  }, [drawerCtx.isOpen]);

  return (
    <Drawer anchor={anchor} open={drawerState} onClose={closeDrawer}>
      <div
        className={
          clsx(
            classes.list, 
            {
              [classes.fullList]: anchor === 'bottom',
            }
          )
        }
        role="presentation"
        // onKeyDown={closeDrawer}
        >
        <br/>
        <Container>
          <Grid item xs={12} container 
          // justify="flex-end"
          >
            <Box>
              <Button onClick={closeDrawer} className='closeButton' >
              <CancelSharpIcon ></CancelSharpIcon>
              </Button>
            </Box>
          </Grid>
        </Container>
        <br/>
          <div>
            <EntryInfo entry = {entry}></EntryInfo>
            <br/>
            <UnlinkList entry = {entry}></UnlinkList>
          </div>
      </div>
    </Drawer>
  );
}
