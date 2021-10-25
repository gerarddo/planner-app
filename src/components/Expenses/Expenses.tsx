import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useContext } from 'react';
import ExpensesList from './ExpensesList/ExpensesList';
import ExpenseDrawer from '../ExpenseDrawer/ExpenseDrawer'
import ExpensesContext from '../../store/expenses-context';
import MenuDrawerContext from '../../store/menu-drawer-context';
import * as XLSX from 'xlsx';
import { ExpenseControllerApi } from '../../api'
import { Grid, Paper } from '@mui/material';
import { CSVLink } from "react-csv";
import ExpensesBar from './ExpensesBar/ExpensesBar';
import ExpensesFooter from './ExpensesFooter/ExpensesFooter';
function preventDefault(event: any) {
  event.preventDefault();
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(0),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));


export default function Expenses() {

    const today = new Date()
    const pageCount = today.getMonth()+1
    const [fetchMonth, setFetchMonth] = useState(1);
    const [page, setPage] = useState(pageCount);

    const classes = useStyles();
    const ctx = useContext(ExpensesContext);
    const menuCtx = useContext(MenuDrawerContext);
    const expenseController = new ExpenseControllerApi();
    const csvLinkRef = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
    const [transactionData, setTransactionData] = useState([])

    useEffect(() => {
        ctx.updateExpenses()
        menuCtx.updateTabTitle('All Expenses')
    }, [ctx.fetchMonth]);

    function monthExpensesUpdate(ev: object, pageNum: number){
        ctx.updateFetchMonth(pageNum - 1)
        setFetchMonth(pageNum - 1)
        setPage(pageNum)
    }

    function onHandleDownload(){
      expenseController.expenseControllerDownloadCsv().then((response: any) => {
        setTransactionData(response.data)
        if (csvLinkRef?.current) {
          csvLinkRef.current.link.click();
        }
      })
    }
      
    function refreshPage() { window.location.reload()};
    // handle file upload
    const handleFileUpload = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        /* Parse data */
        let bstr: any = evt.target.result;
        const wb = XLSX.read(bstr, { 
            type: 'binary',   
            cellDates: true,
            cellNF: false,
            cellText: false
          }
        );
        /* Get first worksheet */
        const ws = wb.Sheets[wb.SheetNames[0]];
        /* Convert array of arrays */
        const records: any = XLSX.utils.sheet_to_json(ws, {raw: false, dateNF:'yyyy-mm-dd'}).map((record: any) => {
          record.inflow = parseFloat(record.inflow)
          record.outflow = parseFloat(record.outflow)
          return record
        });
        expenseController.expenseControllerCreateAll(records).then((response:any) => {
          refreshPage() 
        })
      };
      reader.readAsBinaryString(file);
    }

    return(
        <React.Fragment>
          <Paper className={classes.paper}>
            <Grid container>
              <ExpensesBar></ExpensesBar>
            </Grid>
            <Grid container style={{marginTop : 20}}>
              <br />
              <ExpensesList year={2021} month={fetchMonth}></ExpensesList>
              <ExpenseDrawer></ExpenseDrawer>
              </Grid>
              <ExpensesFooter></ExpensesFooter>
            </Paper>
        </React.Fragment>
    )
}