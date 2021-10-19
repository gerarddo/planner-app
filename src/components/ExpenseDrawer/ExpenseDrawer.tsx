import React, { useEffect, useState }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import { useContext } from 'react';
import ExpenseInfo from './ExpenseInfo/ExpenseInfo'
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box, Button } from "@mui/material";
import LinkList from './LinkList/LinkList';
import ExpensesDrawerContext from '../../store/expenses-drawer-context';
import { IExpense } from '../../api';
import ExpenseEdit from './ExpenseEdit/ExpenseEdit';


export default function ExpenseDrawer(props: any) {

  const drawerCtx = useContext(ExpensesDrawerContext);
  const [drawerState, setDrawerState] = React.useState(false);
  const [expense, setExpense] = useState({})
  const [flows, setFlows] = useState(0)
  const [onEdit, setOnEdit] =  useState(false)

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
      setExpense(drawerCtx.item)

      const newExpense: IExpense = drawerCtx.item
      setExpense(newExpense)
      if(newExpense.outflow > 0){
        setFlows( -newExpense.outflow )
      } else {
        setFlows( newExpense.inflow )
      }

      setDrawerState(drawerCtx.isOpen)
      setOnEdit(drawerCtx.onEdit)

  }, [drawerCtx.isOpen, drawerCtx.onEdit]);

  const conditionalEdit = () => {
    if(onEdit){
      return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
          <ExpenseEdit expense = {expense} flows = {flows}></ExpenseEdit>
        </Box>
      )
    } else {
      return (
        <div>
        <ExpenseInfo expense = {expense}></ExpenseInfo>
        <br/>
        <LinkList expense = {expense}></LinkList>
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
        // onKeyDown={closeDrawer}
        >
        <br/>
        <Container>
          <Grid item xs={12} container 
          // justify="flex-end"
          >
            <Box>
              <Button className='closeButton' onClick={closeDrawer}>
              <CancelSharpIcon ></CancelSharpIcon>
              </Button>
            </Box>
          </Grid>
        </Container>
        <br/>
        {conditionalEdit()}
      </div>
    </Drawer>
  );
}
