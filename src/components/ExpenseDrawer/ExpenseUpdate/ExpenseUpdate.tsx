
import { makeStyles } from '@mui/styles';
import CancelExpenseEditButton from "./CancelExpenseEditButton/CancelExpenseEditButton";
import { Grid, Paper } from "@mui/material";
import ExpenseCreate from "./ExpenseCreate/ExpenseCreate";
import ExpenseEdit from "./ExpenseEdit/ExpenseEdit";
import CancelExpenseCreateButton from "./CancelExpenseCreateButton/CancelExpenseCreateButton";
export default function ExpenseUpdate(props: any) {

    const useStyles = makeStyles((theme: any) => ({
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column'
          },
    }));
    
    const classes = useStyles();

    const expense = props.expense
    const flows = props.flows

    let title = 'Update expense'
    console.log(expense)
    console.log(flows) 
    if (!!expense && !!flows){
        title = 'Edit expense'
    } else {
        title = 'Create expense'
    }

    const conditionalUpdate = () => {
        if (!!expense && !!flows){
            return (
                <ExpenseEdit expense={expense} flows={flows}></ExpenseEdit>
            )
        } else {
            return (
                <ExpenseCreate></ExpenseCreate>            
            )
        }
    }

    const conditionalButton = () => {
        if (!!expense && !!flows){
            return (
                <CancelExpenseEditButton></CancelExpenseEditButton>
            )
        } else {
            return (
                <CancelExpenseCreateButton></CancelExpenseCreateButton>
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