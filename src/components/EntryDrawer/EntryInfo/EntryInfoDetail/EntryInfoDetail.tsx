import Title from '../../../common/Title/Title';
import { Grid, Typography } from "@mui/material";
import CalendarIcon from '../../../common/CalendarIcon/CalendarIcon';



export default function EntryInfoDetail(props: any) {

    const entry = props.entry
    const flows = props.flows

    return (
        <Grid item container>
            <Grid item xs={4}>
                <CalendarIcon ymd={entry.ymd}></CalendarIcon>
            </Grid>
            <Grid item xs={7}>
                <h4>Entry information</h4>
                <Title>{entry.description}</Title>        
                <Typography color="textSecondary" >
                    {entry.method}
                </Typography>
                <Typography component="p" variant="h4">
                    {flows} MXN
                </Typography>
            </Grid>
        </Grid>
    )
}