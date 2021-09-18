import React, { useEffect, useState }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { useContext } from 'react';
import ExpenseInfo from './ExpenseInfo/ExpenseInfo'
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from "@material-ui/core";
import LinkList from './LinkList/LinkList';
import ExpensesDetailContext from '../../store/expenses-detail-context';
import ExpensesDrawerContext from '../../store/expenses-drawer-context';
import { EntryControllerApi } from '../../api'


export default function ExpenseDrawer(props: any) {

  const drawerCtx = useContext(ExpensesDrawerContext);
  const [drawerState, setDrawerState] = React.useState(false);
  const [expense, setExpense] = useState({})
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
      drawerCtx.updateIsOpen(false)
  };

  useEffect(() => {      
      setExpense(drawerCtx.item)
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
          <Grid item xs={12} container justify="flex-end">
            <Box>
              <Button className='closeButton' onClick={closeDrawer}>
              <CancelSharpIcon ></CancelSharpIcon>
              </Button>
            </Box>
          </Grid>
        </Container>
        <br/>
          <div>
            <ExpenseInfo expense = {expense}></ExpenseInfo>
            <br/>
            <LinkList expense = {expense}></LinkList>
          </div>
      </div>
    </Drawer>
  );
}
