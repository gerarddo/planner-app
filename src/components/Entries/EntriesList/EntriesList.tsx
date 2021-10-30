import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';
import EntriesContext from '../../../store/entries-context';
import Divider from '@mui/material/Divider';
import OpenEntryDetailButton from '../../common/OpenEntryDetailButton/OpenEntryDetailButton';
import DeleteEntryButton from '../../common/DeleteEntryButton/DeleteEntryButton';
import EditEntryButton from '../../common/EditEntryButton/EditEntryButton';
import { Grid } from '@mui/material'; 

export default function EntriesList(props: any) {

  const [entries, setEntries] = useState([])
  const entryCtx = useContext(EntriesContext);

  useEffect(() => {
    setEntries(entryCtx.entries)
  }, [entryCtx.entries]);

  function conditionalComponent(){
    if(entries.length == 0){
      return(
        <div>      
          <Divider variant="middle" />
          <p>No entries found.</p>
        </div>
      )
    } else {
      return(
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell align="right">Inflows</TableCell>
              <TableCell align="right">Outflows</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Grid container>
                    <Grid item>
                      <DeleteEntryButton idEntry={row.id}></DeleteEntryButton>
                    </Grid>
                    <Grid item>
                      <EditEntryButton idEntry={row.id}></EditEntryButton>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.ymd}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.method}</TableCell>
                <TableCell align="right">{row.inflow}</TableCell>
                <TableCell align="right">{row.outflow}</TableCell>
                <TableCell align="right">
                  <OpenEntryDetailButton entry={row} ></OpenEntryDetailButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }
  }

  return (
    <React.Fragment>
          {conditionalComponent()}
      </React.Fragment>
  );
}