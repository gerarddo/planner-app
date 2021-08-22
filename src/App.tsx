import React, { useContext, useEffect } from 'react';
import { AppBar, Badge, Box, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SideMenu from './components/SideMenu/SideMenu';
import './App.css';
import Dashboard from './components/Dashboard'
import Deposits from './components/Deposits';
import MenuDrawerContext from './store/menu-drawer-context';
import clsx from 'clsx';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Expenses from './components/Expenses/Expenses';
import UnlinkedExpenses from './components/UnlinkedExpenses/UnlinkedExpenses';

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function App() {

  const classes = useStyles();
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const [tabTitle, setTabTitle] = React.useState('');

  const menuCtx = useContext(MenuDrawerContext);
  
  useEffect(() => {
    setMenuIsOpen(menuCtx.isOpen)
    setTabTitle(menuCtx.tabTitle)
  }, [menuCtx.tabTitle,menuCtx.item,menuCtx.isOpen]);
  
  const handleDrawerOpen = () => {
    menuCtx.updateIsOpen(true)
  };

  return (
    <div className="App">
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position="absolute" className={clsx(classes.appBar, menuIsOpen && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, menuIsOpen && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {tabTitle}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        


        <Router>
        <SideMenu></SideMenu>

        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
            <Switch>
                <Route exact path='/' component={UnlinkedExpenses} />
                <Route exact path='/expenses' component={Expenses} />
            </Switch>
            </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>          
        </Router>


      </div>
    </div>
  );
}

export default App;


