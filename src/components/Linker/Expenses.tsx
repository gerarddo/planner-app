import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import TemporaryDrawer from './Drawer'
import { EntryControllerApi } from '../../api'



function preventDefault(event: any) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Expenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedExpenses, setLoadedExpenses] = useState([])
  const classes = useStyles();
  const entryController = new EntryControllerApi()

  useEffect(() => {
    setIsLoading(true)
    entryController.entryControllerFind().then(response => {
      return response.data
    }).then((data: any) => {
      setIsLoading(false)
      setLoadedExpenses(data)
    });
  }, []);


  if(isLoading){
    return (
      <section>
        <p>Loading...</p>
      </section>
    )
  }

  return (
    <React.Fragment>
      <Title>My Expenses</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Inflows</TableCell>
            <TableCell align="right">Outflows</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadedExpenses.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{row.ymd}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell align="right">{row.inflow}</TableCell>
              <TableCell align="right">{row.outflow}</TableCell>
              <TableCell align="right"><TemporaryDrawer props={row}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Expenses 
        </Link>
      </div>
    </React.Fragment>
  );
}