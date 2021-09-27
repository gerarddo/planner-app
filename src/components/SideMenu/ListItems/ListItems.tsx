import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
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