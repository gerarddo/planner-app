import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';


export const mainListItems = (
  <div>
    {/* <Link to={'/'} className="nav-link"> 
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Unlinked Expenses" />
      </ListItem>
    </Link> */}
    <Link to={'/expenses'} className="nav-link">  
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Expenses made" />
      </ListItem>
    </Link>
    <Link to={'/entries'} className="nav-link">  
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Expenses planned" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <Link to={'/settings'} className="nav-link">  
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
          <ListItemText primary="Settings" />
      </ListItem>
    </Link>
  </div>
);