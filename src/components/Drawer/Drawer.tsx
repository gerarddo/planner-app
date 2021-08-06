import React, { useEffect, useState }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { useContext } from 'react';
import './Drawer.css';
import ExpenseDetail from '../common/ExpenseDetail/ExpenseDetail'
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from "@material-ui/core";
import EntriesList from './EntriesList/EntriesList';
import EntriesContext from '../../store/entries-context';
import DrawerContext from '../../store/drawer-context';
import { EntryControllerApi } from '../../api'


export default function TemporaryDrawer(props: any) {

  const entryCtx = useContext(EntriesContext);
  const drawerCtx = useContext(DrawerContext);
  const [drawerState, setDrawerState] = React.useState(false);
  const [expense, setExpense] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const entryController = new EntryControllerApi()

  type Anchor = 'top' | 'left' | 'bottom' | 'right';
  const anchor: Anchor = 'bottom'

  const useStyles = makeStyles((theme) => ({
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

  const classes = useStyles();

  const closeDrawer =( event: React.KeyboardEvent | React.MouseEvent, ) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerState(false);
      drawerCtx.updateIsOpen(false)
  };

  useEffect(() => {
      let year = 2021
      let month = entryCtx.month
      entryCtx.updateIsFetching(true)
      setIsLoading(true)
      setExpense(drawerCtx.expense)
      entryController.entryControllerFind(month, year).then((response:any) => {
              return response.data
            }).then((entriesList: any) => {
              entryCtx.updateEntriesList(entriesList)
              entryCtx.updateIsFetching(false)
              setIsLoading(false)
              return entriesList
            });
      setDrawerState(drawerCtx.open)
  }, [entryCtx.month,drawerCtx.expense,drawerCtx.open]);

  if(isLoading){
    return(
      <div>Loading...</div>
    )
  }

  function conditionalComponent(){
    if(isLoading){
      return(
        <div>Loading...</div>
      )
    } else {
      return(
        <div>
          <ExpenseDetail  expense = {expense}></ExpenseDetail>
          <br/>
          <EntriesList></EntriesList>
        </div>
      )
    }
  }

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
        onClick={closeDrawer}
        onKeyDown={closeDrawer}
        >
        <br/>
        <Container>
          <Grid item xs={12} container justify="flex-end">
            <Box>
              <Button className='closeButton' onClick={closeDrawer}>
              <CancelSharpIcon ></CancelSharpIcon>
              </Button>
            </Box>
          </Grid>
        </Container>
        <br/>
        {conditionalComponent()}
      </div>
    </Drawer>
  );
}
