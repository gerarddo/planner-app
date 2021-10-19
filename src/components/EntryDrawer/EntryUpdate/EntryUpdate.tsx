
import EntryEdit from "./EntryEdit/EntryEdit"
import { makeStyles } from '@mui/styles';
import CancelEditEntryButton from "./CancelEntryEditButton/CancelEntryEditButton";
import { Grid, Paper } from "@mui/material";
import EntryCreate from "./EntryCreate/EntryCreate";
import CancelEntryCreateButton from "./CancelEntryCreateButton/CancelEntryCreateButton";
export default function EntryUpdate(props: any) {

    const useStyles = makeStyles((theme: any) => ({
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column'
          },
      }));
    
    const classes = useStyles();

    const entry = props.entry
    const flows = props.flows

    let title = 'Update entry'

    if (!!entry && !!flows){
        title = 'Edit entry'
    } else {
        title = 'Create entry'
    }

    const conditionalUpdate = () => {
        if (!!entry && !!flows){
            return (
                <EntryEdit></EntryEdit>
            )
        } else {
            return (
                <EntryCreate></EntryCreate>            
            )
        }
    }

    const conditionalButton = () => {
        if (!!entry && !!flows){
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