
import EntryEdit from "./EntryEdit/EntryEdit"
import { makeStyles } from '@mui/styles';
import CancelEditEntryButton from "./CancelEntryEditButton/CancelEntryEditButton";
import { Grid, Paper } from "@mui/material";
import EntryCreate from "./EntryCreate/EntryCreate";
import CancelEntryCreateButton from "./CancelEntryCreateButton/CancelEntryCreateButton";
import { useContext, useEffect, useState } from "react";
import EntriesDrawerContext from "../../../store/entries-drawer-context";
import { IEntry } from "../../../api";

export default function EntryUpdate(props: any) {

    const drawerCtx = useContext(EntriesDrawerContext);

    const mockEntry: IEntry = {
        id: '',
        ymd: '',
        tags: [],
        description: '',
        method: '',
        inflow: 0,
        outflow: 0
      }
    
    const [entry, setEntry] = useState(mockEntry)
    const [onUpdateCase, setOnUpdateCase] =  useState('create')

    const [flows, setFlows] = useState(0)

    useEffect(() => {  

        // current entry state
        const currentEntry: IEntry = drawerCtx.item
        setEntry(currentEntry)
        setFlows(currentEntry.outflow > 0 ? -currentEntry.outflow  : currentEntry.inflow);
    
        // current drawer state
        setOnUpdateCase(drawerCtx.onUpdateCase) // toggles create or edit
    
    }, [drawerCtx.onUpdateCase]);

    const useStyles = makeStyles((theme: any) => ({
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column'
          },
    }));
    
    const classes = useStyles();

    let title = onUpdateCase == 'edit' ? 'Edit entry' : 'Create entry'

    const conditionalUpdate = () => {
        if (onUpdateCase == 'edit'){
            return (
                <EntryEdit entry={entry} flows={flows}></EntryEdit>
            )
        } else {
            return (
                <EntryCreate></EntryCreate>
            )
        }
    }

    const conditionalButton = () => {
        if (onUpdateCase == 'edit'){
            return (
                <CancelEditEntryButton></CancelEditEntryButton>
            )
        } else {
            return (
                <CancelEntryCreateButton></CancelEntryCreateButton>
            )
        }
    }
    return (
        <Paper className={classes.paper} sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2 }}>
            <Grid container>
                <Grid item sx={{ flexGrow: 1 }}>
                <h4>{title}</h4>
                </Grid>
                <Grid item >
                    {conditionalButton()}
                </Grid>
            </Grid>
            {conditionalUpdate()}
        </Paper>
    )
}