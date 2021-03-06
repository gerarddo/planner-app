import Drawer from '@mui/material/Drawer';
import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuDrawerContext from '../../store/menu-drawer-context';
import { mainListItems, secondaryListItems } from './ListItems/ListItems';

const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => ({
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }
  }));

export default function SideMenu(props: any){
    // @ts-ignore
    const classes = useStyles();
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const drawerCtx = useContext(MenuDrawerContext);

    useEffect(() => {
        setMenuIsOpen(drawerCtx.isOpen)
    }, [drawerCtx.item,drawerCtx.isOpen]);

    const handleDrawerClose = () => {
        drawerCtx.updateIsOpen(false)
    };
 
    return( 
        <Drawer
            variant="permanent"
            classes={{
            paper: clsx(classes.drawerPaper, !menuIsOpen && classes.drawerPaperClose),
            }}
            open={menuIsOpen}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {mainListItems}
            </List>
            <Divider />
            <List>
                {secondaryListItems}
            </List>
        </Drawer>
    )
}