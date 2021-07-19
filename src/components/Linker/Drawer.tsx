import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpenseSelection from './ExpenseSelection';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer(props: any) {
  
  const classes = useStyles();
  
  const expensesList = ['Inbox', 'Starred', 'Send email', 'Drafts']

  const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    }
  );

  const toggleDrawer = (anchor: Anchor, open: boolean) => ( event: React.KeyboardEvent | React.MouseEvent, ) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={
        clsx(
          classes.list, 
          {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          }
        )
      }
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {
          expensesList.map((text, index) => (
            <ListItem button key={text}>              
              <ListItemText primary={text} /> 
              <ExpenseSelection props={props.props}/>
            </ListItem>
          ))
        }
      </List>
    </div>
  );

  return (
    <div>
      {(['bottom'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
