import Title from '../../../common/Title/Title';
import { Grid, Typography } from "@mui/material";
import CalendarIcon from '../../../common/CalendarIcon/CalendarIcon';

export default function ExpenseInfoDetail(props: any) {

    const expense = props.expense
    const flows = props.flows

    return (
        <Grid item container>
            <Grid item xs={4}>
                <CalendarIcon ymd={expense.ymd}></CalendarIcon>
            </Grid>
            <Grid item xs={7}>
                <h4>Expense information</h4>
                <Title>{expense.description}</Title>        
                <Typography color="textSecondary" >
                    {expense.method}
                </Typography>
                <Typography component="p" variant="h4">
                    {flows} MXN
                </Typography>
            </Grid>
        </Grid>
    )
}