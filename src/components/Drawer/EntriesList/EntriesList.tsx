import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EntrySelection from '../EntrySelection/EntrySelection';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import EntriesContext from '../../../store/entries-context';
import { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import DrawerContext from '../../../store/drawer-context';
export default function EntriesList(props: any){

    const [loadedEntries, setLoadedEntries] = useState([])
    const entryCtx = useContext(EntriesContext);
    const drawerCtx = useContext(DrawerContext);

    const [expense, setExpense] = useState({})

    useEffect(() => {
        setLoadedEntries(entryCtx.entries)
    }, [entryCtx.entries]);

    return(
        <Container>
            <Paper>
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
                        {loadedEntries.map((row: any) => {
                        return (
                        <TableRow key={row.id} >
                            <TableCell>{row.ymd}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.method}</TableCell>
                            <TableCell align="right">{row.inflow}</TableCell>
                            <TableCell align="right">{row.outflow}</TableCell>
                            <TableCell align="right">
                            <span >
                                <EntrySelection entryId={row.id} />
                            </span>
                            </TableCell>
                        </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    )
}